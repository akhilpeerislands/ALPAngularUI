import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/demo/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

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
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    email!: string;

    routingLink = '/auth/login';

    message = '';

    constructor(public layoutService: LayoutService, private productService: ProductService, private router: Router) { }

    login(){
        this.productService.loginSupervisor(this.email).subscribe(data => {
            if(data)
            {
                console.log(data);
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
