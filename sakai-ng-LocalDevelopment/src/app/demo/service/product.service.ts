import { Injectable } from '@angular/core';
import { Appointment, Product } from '../api/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    supervisor!: any;

    setSupervisor(supervisor: any)
    {
      this.supervisor = supervisor;
    }

    getSupervisor(): any { return this.supervisor; }

    getAllMeetings(): Observable<any> {
        const url = 'http://localhost:8080/getallmeets';
      
        const headers = new HttpHeaders();
      
        return this.http.get(url, { headers }).pipe(
          catchError(error => {
            console.error(error);
            return throwError(error);
          })
        );
      }

      deleteMeeting(id: any): Observable<any> {
        const url = 'http://localhost:8080/deleteMeeting/'+ id;
        const headers = new HttpHeaders();
        return this.http.get(url, { headers }).pipe(
          catchError(error => {
            console.error(error);
            return throwError(error);
          })
        );
      }

      getAllClients(): Observable<any> {
        const url = 'http://localhost:8080/getAllClients';
      
        const headers = new HttpHeaders();
      
        return this.http.get(url, { headers }).pipe(
          catchError(error => {
            console.error(error);
            return throwError(error);
          })
        );
      }
      
      getClient(id: any): Observable<any> {
        const url = 'http://localhost:8080/getClient/'+id;
      
        const headers = new HttpHeaders();
      
        return this.http.get(url, { headers }).pipe(
          catchError(error => {
            console.error(error);
            return throwError(error);
          })
        );
      }
      getAllBTs(supervisorMailId: any): Observable<any> {
        const url = 'http://localhost:8080/getSupervisorBTs/'+supervisorMailId;
      
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
        return this.http.get(url, { headers }).pipe(
          catchError(error => {
            console.error(error);
            return throwError(error);
          })
        );
      }

      loginSupervisor(supervisorMailId: any): Observable<any> {
        const url = 'http://localhost:8080/loginSupervisor/'+supervisorMailId;
      
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
        return this.http.get(url, { headers }).pipe(
          catchError(error => {
            console.error(error);
            return throwError(error);
          })
        );
      }

      scheduleMeeting(body: any): Observable<any> {
        const url = 'http://localhost:8080/scheduleMeeting';
      console.log("hello");
        const headers = new HttpHeaders();
      
        return this.http.post(url, body, { headers }).pipe(
          catchError(error => {
            console.error(error);
            return throwError(error);
          })
        );
      }
      updateMeeting(body: any, id: any): Observable<any> {
        const url = 'http://localhost:8080/updateMeeting/'+ id;
      console.log("Updating Meeting");
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
        return this.http.put(url, body, { headers }).pipe(
          catchError(error => {
            console.error(error);
            return throwError(error);
          })
        );
      }
      getAllMasterMeetings(): Observable<any> {
        const url = 'http://localhost:8080/masterMeetings';
      
        const headers = new HttpHeaders();
      
        return this.http.get(url, { headers }).pipe(
          catchError(error => {
            console.error(error);
            return throwError(error);
          })
        );
      }
      getSupervisionClients(): Observable<any> {
        const url = 'http://localhost:8080/supervisionClients';
      
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');
      
        return this.http.get(url, { headers }).pipe(
          catchError(error => {
            console.error(error);
            return throwError(error);
          })
        );
      }
    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
    getMeets() {
        return this.http.get<any>('assets/demo/data/meets.json')
            .toPromise()
            .then(res => res.data as Appointment[])
            .then(data => data);
    }
    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getInstructions(meetingName: any) {
      let data = {
        "title": "Scheduling the Monthly POD Meeting",
        "steps": ["Verify the accuracy of the list of BTs displayed in the box on the right. Ensure that the BTs assigned to you are correctly shown.", 
        "If you need to exclude someone, simply \"Deselect\" their respective check-box.",
        "Select the future date on which you wish to schedule the Monthly POD meeting. Please note, the system only permits scheduling for future dates, ideally for the following month.",
        "Set the meeting's Start time and End time according to your time zone. The system will automatically identify and adapt to the time zone of each respective BT.",
        "Select BCBA’s name that is hosting the meeting.  You can find the desired name by typing their first or last name into the drop-down search box.",
        "Finally, click on the \"Schedule Now\" button, and the process is complete. Happy scheduling! 😊"
      ]
      }
      return data
    }
}
