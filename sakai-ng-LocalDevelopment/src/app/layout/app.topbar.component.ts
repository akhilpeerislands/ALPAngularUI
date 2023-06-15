import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { SessionService } from '../demo/service/session.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [SessionService, ConfirmationService]
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private confirmationService: ConfirmationService,
        private router: Router,
        private sessionService: SessionService) { }

    confirm2(event: Event) {
        this.confirmationService.confirm({
            key: 'confirm2',
            target: event.target || new EventTarget,
            message: 'Hey '+  this.sessionService.getValue("supervisorName") +', Are you sure to Logout?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.setValueInSession("supervisor", "")
                this.setValueInSession("supervisorName", "")
                this.router.navigate(['/auth/login']);
            },
            reject: () => {
                // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }

    setValueInSession(key: any, value: any) {
        this.sessionService.setValue(key, value);
        }
}
