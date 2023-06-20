import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
})
export class NotfoundComponent implements OnInit {

    constructor(private router: Router){
        
    }
    ngOnInit() {
        
        this.router.navigate(['uikit/scheduler']);
    }
 }