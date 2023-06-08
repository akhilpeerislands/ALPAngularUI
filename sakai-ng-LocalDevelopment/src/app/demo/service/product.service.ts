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

    getInstructions() {
      let data = 
        [
          {
          "meetingName": "Monthly POD meeting",
          "title": "Scheduling the Monthly POD Meeting",
          "description": "To set up this meeting, please follow the instructions detailed below:",
          "steps": ["Verify the accuracy of the list of BTs displayed in the box on the right. Ensure that the BTs assigned to you are correctly shown.", 
          "If you need to exclude someone, simply \"Deselect\" their respective check-box.",
          "Select the future date on which you wish to schedule the Monthly POD meeting. Please note, the system only permits scheduling for future dates, ideally for the following month.",
          "Set the meeting's Start time and End time according to your time zone. The system will automatically identify and adapt to the time zone of each respective BT.",
          "Select BCBA’s name that is hosting the meeting.  You can find the desired name by typing their first or last name into the drop-down search box.",
          "Finally, click on the \"Schedule Now\" button, and the process is complete. Happy scheduling! 😊"]
          },
          {
          "meetingName": "Mid-year check-in meeting",
          "title": "Scheduling the Mid-year check-in meeting",
          "description": "Arranging this meeting is easy; just follow these outlined steps:",
          "steps": [
          "From the list in the right-side box, pick the BT with whom you'd like to schedule the meeting. Please verify that the BTs displayed are indeed assigned to you.", 
          "If there's a need to switch the selected person, simply click on \"Deselect\" in their respective check-box and select the right individual.",
          "Choose the upcoming date for your Mid-year check-in meeting. Bear in mind, the system only allows bookings for future dates, preferably for the subsequent month",
          "Determine the Start and End times of your meeting, which should be in accordance with your time zone. The system will automatically recognize each BT's respective time zone and adjust accordingly.",
          "Select PM or BA’s Name that is hosting the meeting.  You can find the desired name by typing their first or last name into the drop-down search box.",
          "Once done, simply hit the \"Schedule Now\" button. Your meeting is now booked. Enjoy your scheduling experience! 😊Annual Review"]
          },
          {
          "meetingName": "Annual Review",
          "title": "Scheduling Annual Review Meeting",
          "description": "Arranging this meeting is easy; just follow these outlined steps:",
          "steps": ["From the list in the right-side box, pick the BT with whom you'd like to schedule the meeting. Please verify that the BTs displayed are indeed assigned to you.", 
          "If there's a need to switch the selected person, simply click on \"Deselect\" in their respective check-box and select the right individual.",
          "Select the future date on which you wish to schedule the Annual Review meeting. Please note, the system only permits scheduling for future dates, ideally for the following month.",
          "Set the meeting's Start time and End time according to your time zone. The system will automatically identify and adapt to the time zone of each respective BT.",
          "Select BCBA’s name that is hosting the meeting.  You can find the desired name by typing their first or last name into the drop-down search box.",
          "Finally, click on the \"Schedule Now\" button, and the process is complete. Happy scheduling! 😊"]
          },
          {
          "meetingName": "Paid Social Event",
          "title": "Organizing a Paid Social Event",
          "description": "To organize this exciting meeting, kindly adhere to the step-by-step instructions provided below:",
          "steps": ["Confirm the accuracy of the BT list displayed in the right-hand box. Make sure that the BTs assigned to you are the ones appearing. Choose the BTs you want to include in the meeting by ticking the corresponding checkbox.", 
          "If you need to alter the chosen participant, simply click \"Deselect\" in their respective check-box, and then select the correct individual.",
          "Pick a future date for your Monthly POD meeting. Please bear in mind that the system only allows you to schedule meetings for future dates, ideally the subsequent month.",
          "Designate the Start and End times of the meeting in line with your time zone. Rest assured, the system will automatically discern and adjust to each BT's specific time zone.",
          "Select BCBA’s name that is hosting the meeting.  You can find the desired name by typing their first or last name into the drop-down search box.",
          "Once you've completed the above steps, simply press the \"Schedule Now\" button. Your meeting is now successfully organized. Enjoy your scheduling journey! 😊"]
          },
          {
          "meetingName": "Clinic Team meeting",
          "title": "Setting Up a Clinic Team Meeting",
          "description": "Organizing this meeting is a breeze with these simple steps:",
          "steps": ["Select the BTs for the meeting from the list in the right-side box, ensuring that the displayed BTs are indeed the ones assigned to you", 
          "If you need to alter the chosen participant, simply click \"Deselect\" in their respective check-box, and then select the correct individual.",
          "Opt for a future date for your Mid-year check-in meeting. Keep in mind, the system only supports reservations for future dates, ideally the following month.",
          "Set your meeting's Start and End times, aligning with your time zone. The system will automatically detect and adjust to each BT's specific time zone.",
          "To identify the client for the meeting, first retrieve the “CR ID” from the Centralreach EMR system. Then, copy this “CR ID” from the EMR system and paste it here in the search box. This action will display the client's name for verification. Please confirm the correctness of the first and last names.",
          "After completing these steps, simply click the \"Schedule Now\" button. Your meeting is now set. Relish your easy scheduling experience! 😊"]
          },
          {
          "meetingName": "Individual BT Meeting (Not RBT Supervision)",
          "title": "Individual BT Meeting (Not RBT Supervision) / Individual BT Meeting RBT Supervision",
          "description": "Organizing these meeting(s) is straightforward; simply follow these step-by-step instructions:",
          "steps": ["Select the BT you wish to arrange the meeting with from the list located in the right-side box. Please ensure that the displayed BTs are those assigned to you.", 
          "If you need to change the chosen person, simply click \"Deselect\" on their respective check-box and select the appropriate individual.",
          "Select a future date for your Individual BT meeting. Remember, the system allows scheduling only for future dates, ideally the following month.",
          "Set the Start and End times of your meeting to align with your time zone. The system will automatically detect and adjust to the BT's specific time zone.",
          "Select BCBA’s name that is hosting the meeting (if RBT Supervision).  PM name can be used if not RBT supervision.  You can find the desired name by typing their first or last name into the drop-down search box.",
          "Once completed, simply click the \"Schedule Now\" button. Your meeting is now set. Enjoy the ease of your scheduling process! 😊"]
          },
          {
          "meetingName": "Individual BT Meeting RBT Supervision",
          "title": "Individual BT Meeting (Not RBT Supervision) / Individual BT Meeting RBT Supervision",
          "description": "Organizing these meeting(s) is straightforward; simply follow these step-by-step instructions:",
          "steps": ["Select the BT you wish to arrange the meeting with from the list located in the right-side box. Please ensure that the displayed BTs are those assigned to you.", 
          "If you need to change the chosen person, simply click \"Deselect\" on their respective check-box and select the appropriate individual.",
          "Select a future date for your Individual BT meeting. Remember, the system allows scheduling only for future dates, ideally the following month.",
          "Set the Start and End times of your meeting to align with your time zone. The system will automatically detect and adjust to the BT's specific time zone.",
          "Select BCBA’s name that is hosting the meeting (if RBT Supervision).  PM name can be used if not RBT supervision.  You can find the desired name by typing their first or last name into the drop-down search box.",
          "Once completed, simply click the \"Schedule Now\" button. Your meeting is now set. Enjoy the ease of your scheduling process! 😊"]
          },
          {
          "meetingName": "Group RBT Supervision",
          "title": "Scheduling a Group RBT Supervision",
          "description": "To organize this exciting meeting, kindly adhere to the step-by-step instructions provided below:",
          "steps": ["Confirm the accuracy of the BT list displayed in the right-hand box. Make sure that the BTs assigned to you are the ones appearing. Choose the BTs you want to include in the meeting by ticking the corresponding checkbox.", 
          "If you wish to remove a participant, simply \"Deselect\" the corresponding checkbox.",
          "Pick a future date for your Monthly POD meeting. Please bear in mind that the system only allows you to schedule meetings for future dates, ideally the subsequent month.",
          "Designate the Start and End times of the meeting in line with your time zone. Rest assured, the system will automatically discern and adjust to each BT's specific time zone.",
          "Select BCBA’s name that is hosting the meeting . You can find the desired name by typing their first or last name into the drop-down search box.",
          "Once you've completed the above steps, simply press the \"Schedule Now\" button. Your meeting is now successfully organized. Enjoy your scheduling journey! 😊"]
          }
        ]
      return data
    }
}
