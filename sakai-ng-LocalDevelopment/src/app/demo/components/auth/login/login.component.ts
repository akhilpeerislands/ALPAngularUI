import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/demo/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SessionService } from 'src/app/demo/service/session.service';

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
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    email!: string;

    routingLink = '/auth/login';

    message = '';

    constructor(public layoutService: LayoutService, private productService: ProductService, private router: Router,
        private sessionService: SessionService) { }

    setValueInSession(key: any, value: any) {
        this.sessionService.setValue(key, value);
        }

    login(){
        this.productService.loginSupervisor(this.email).subscribe(data => {
            if(data && data.length > 0)
            {
                console.log(data);
                this.setValueInSession("supervisor", data[0].supervisorEmailAddress)
                this.setValueInSession("supervisorName", data[0].supervisorName)
                this.router.navigate(['/uikit/input']);
            }
            else
            {
                this.message = 'Invalid email/supervisor not available in database'
            }
          }, error => {
            console.error(error);

          });    
    }
}
