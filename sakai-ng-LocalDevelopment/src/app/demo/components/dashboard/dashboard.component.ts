import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SessionService } from '../../service/session.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
    providers : [SessionService]
})

export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    supervisor: any;

    allMeetings: any;

    meetingCount: any = 0; 

    todayMeetingCount: any = 0;
    supervisorName: any;
    percentageMeeting: any;

    bts: any;

    constructor(private productService: ProductService, 
        public layoutService: LayoutService,
        private sessionService: SessionService,
        private router: Router) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initiateWithSupervisor();
        // this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    isNewMeeting(event: any)
    {
      const date = new Date(event.updatedDate);
      var firstDateToday = new Date();
      firstDateToday.setHours(0,0,0,0);
      return date > firstDateToday;
    }

    initiateWithSupervisor(){
        this.supervisor = this.getValueFromSession("supervisor");
        this.supervisorName = this.getValueFromSession("supervisorName");
        if(!this.supervisor)
          {
            this.router.navigate(['/auth/login']);
            return;
          }
        this.getMeetings();
        this.getBTs();
      }
      
      getMeetings(){
        this.productService.getAllMeetings(this.supervisor).subscribe(data => {
          console.log(data);
          this.meetingCount = data.length;
          this.allMeetings = data;
          data.sort(function(a: any, b: any) {
            var c = new Date(a.updatedDate).getTime();
            var d = new Date(b.updatedDate).getTime();
            return d-c;
          });  
          let todayMeetingCount = data.filter((meeting: any) => this.isNewMeeting(meeting));
          this.todayMeetingCount = todayMeetingCount.length;
          this.percentageMeeting = Math.round(this.todayMeetingCount/this.meetingCount * 100);
        //   this.scheduledMeetings = this.convertScheduledMeetingsResponse(data);
          }, error => {
          console.error(error);
          });
      }

      getBTs(){
        this.productService.getAllBTs(this.supervisor).subscribe({
            next: (data) => {
                console.log(data);
                this.bts = data;
            },
            error: (error) => {
                console.error(error);
            }
            });
        }
      getValueFromSession(key: any) {
        const value = this.sessionService.getValue(key);
        console.log(value);
        return value;
      }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
