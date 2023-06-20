import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/demo/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SessionService } from 'src/app/demo/service/session.service';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
const request = {
  scopes: ['api://806604ac-b078-4e44-9bbb-f589a988904a/GeneralScope'] // Replace with the scopes you require
};
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [SessionService]
})

export class LoginComponent implements OnInit, OnDestroy {

    valCheck: string[] = ['remember'];

    password!: string;

    email!: string;

    message = '';
    isIframe = false;
    loginDisplay = false;

    
    private readonly _destroying$ = new Subject<void>();

    constructor(public layoutService: LayoutService, private productService: ProductService, private router: Router,
        private sessionService: SessionService,
        @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
        private authService: MsalService,
        private msalBroadcastService: MsalBroadcastService) { }


  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
  }
    setValueInSession(key: any, value: any) {
        this.sessionService.setValue(key, value);
    }

    // login(){
    //     this.productService.loginSupervisor(this.email).subscribe(data => {
    //         if(data && data.length > 0)
    //         {
    //             console.log(data);
    //             this.setValueInSession("supervisor", data[0].supervisorEmailAddress)
    //             this.setValueInSession("supervisorName", data[0].supervisorName)
    //             this.router.navigate(['/uikit/scheduler']);
    //         }
    //         else
    //         {
    //             this.message = 'Invalid email/supervisor not available in database'
    //         }
    //       }, error => {
    //         console.error(error);

    //       });    
    // }
    setLoginDisplay() {
        this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
      }
    
      login() {
        if (this.msalGuardConfig.authRequest) {
            this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
              .subscribe((response: AuthenticationResult) => {
                this.authService.instance.setActiveAccount(response.account);
                this.setValueInSession("supervisor", response.account?.username)
                this.setValueInSession("supervisorName", response.account?.name)
                this.router.navigate(['/uikit/scheduler']);
                this.authService.acquireTokenSilent(request).subscribe((result) => {
                  const accessToken = response.accessToken;
                  console.log("accessToken: " + accessToken);
                  this.setValueInSession("accessToken", accessToken);
                });
                this.initiateLoginIfCached();
              });
          } else {
            this.authService.loginPopup()
              .subscribe((response: AuthenticationResult) => {
                this.authService.instance.setActiveAccount(response.account);
                this.setValueInSession("supervisor", response.account?.username)
                this.setValueInSession("supervisorName", response.account?.name)
                this.router.navigate(['/uikit/scheduler']);
              });
          }
        // if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
          
        // } else {
        //   if (this.msalGuardConfig.authRequest) {
        //     this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
        //   } else {
        //     this.authService.loginRedirect();
        //   }
        // }
      }
    
      initiateLoginIfCached = () => {
        let loginRequest = {
            scopes: ["user.read"] // optional Array<string>
        };
        this.authService.acquireTokenSilent(loginRequest)
            .subscribe(res => {
                this.setValueInSession("token",res.idToken);
            });
            
    }

      logout() {
        this.authService.logout().subscribe((res) => 
        {
            this.router.navigate(['/auth/close']);
        });
        // if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
        //   this.authService.logoutPopup({
        //     postLogoutRedirectUri: "/",
        //     mainWindowRedirectUri: "/"
        //   });
        // } else {
        //   this.authService.logoutRedirect({
        //     postLogoutRedirectUri: "/",
        //   });
        // }
      }
    
      ngOnDestroy(): void {
        this._destroying$.next(undefined);
        this._destroying$.complete();
      }
}
