import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';
import { Appointment, Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { DataView } from 'primeng/dataview';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
    templateUrl: './inputdemo.component.html',
    providers: [ConfirmationService, MessageService]
})
export class InputDemoComponent implements OnInit, OnChanges {
    
    countries: any[] = [];

    filteredCountries: any[] = [];

    selectedCountryAdvanced: any[] = [];

    valColor = '#424242';

    valRadio: string = '';

    valCheck: string[] = [];

    valCheck2: boolean = false;

    valSwitch: boolean = false;

    meetings: SelectItem[] = [];

    selectedMeeting: SelectItem = { value: '' };

    selectedAppointmentType: SelectItem = { value: '' };

    allBTs: any[] = [];

    BTs: any[] = [];

    filteredBTs: any[] = [];

    selectedBTAdvanced: any[] = [];
    
    selectedMultiBT: any[] = [];

    selectedMulti: any[] = [];

    appointments: Appointment[] = [];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    scheduledMeetings: any[] = [];

    masterMeetings: any[] = [];

    supervisionClients: any[] = [];

    clientIdEntered: string = '';

    selectedClient: SelectItem = { value: '' };

    selectedClientSupervisionTypeOrClientName: any;

    selectedDate: any = new Date();

    minDate: any = new Date();

    maxDate: any = this.getLastDayOfNextMonth();

    startTime: any;

    endTime: any;

    valueKnob = 20;

    invalidDate = false;

    invalidPopupDate = false;

    disableSubmit = true;

    disableUpdate = true;

    display = false;

    displayInstructions = false;

    displayPopupMeeting: any;

    selectedPopUpBT: any;

    selectedPopUpAppointmentType: any;

    selectedPopUpStartTime: any;

    selectedPopUpEndTime: any;

    selectedPopUpDate: any;

    supervisor = "ADelgado@autismlearningpartners.com";

    podMeeting = "Monthly POD meeting";
    
    selectedPopUpAppointmentWith: SelectItem = { value: '' };

    allSupervisionClients: any;

    clients: any;

    podMeetsScheduled: any;
  
    selectedPopUpAppointmentWithLabel: any;

    instructions: any;
    
    constructor(private countryService: CountryService, private productService: ProductService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

    ngOnInit() {

        this.getMeetings();

        this.getMasterMeetings();

        this.getSupervisors();

        this.getBTs();

        this.setInstructions();

    }
    
    ngOnChanges() {
    }

    setInstructions(){
      let allInstructions = this.productService.getInstructions();
      if(this.selectedMeeting && this.selectedMeeting.name)
      {
        this.instructions = allInstructions.filter((inst) => inst.meetingName == this.selectedMeeting.name)[0];
      }
      else
      {
        this.instructions = allInstructions[0];
      }
    }

    openInstructions(){
      if(!this.selectedMeeting)
      {
        this.messageService.add({ severity: 'info', summary: 'Choose Meeting', detail: 'Please choose a meeting to get Instructions' });
        return;
      }
      else
      {
        this.setInstructions();
        this.displayInstructions = true;
      }
    }

    showPopUp(meeting: any)
    {
        this.display=true;
        this.displayPopupMeeting = meeting;
        this.selectedPopUpBT = this.displayPopupMeeting.btName;
        this.selectedPopUpAppointmentType = this.displayPopupMeeting.appointmentType;
        this.selectedPopUpStartTime = this.displayPopupMeeting.startTime;
        this.selectedPopUpEndTime = this.displayPopupMeeting.endTime;
        this.selectedPopUpDate = this.displayPopupMeeting.date;
        this.selectedPopUpAppointmentWithLabel = this.displayPopupMeeting.appointmentWith;
        this.selectedPopUpAppointmentWith = {
            label: this.displayPopupMeeting.appointmentWith,
            value: { name: this.displayPopupMeeting.appointmentWith}
          }
        console.log(meeting);
    }

    checkValidations()
    {
        if(this.invalidDate = this.startTime > this.endTime){
            this.disableSubmit = true;
            return;
        }
        
        this.disableSubmit = false;
    }
    checkPopupValidations()
    {
      if(this.selectedPopUpDate & this.selectedPopUpStartTime & this.selectedPopUpEndTime)
      {}
      else
      {
        return;
      }
      this.invalidPopupDate = this.selectedPopUpStartTime > this.selectedPopUpEndTime;
      if(this.invalidPopupDate){
          this.disableUpdate = true;
          return;
      }
      this.disableUpdate = false;
    }

    getMasterMeetings(){
        this.productService.getAllMasterMeetings().subscribe(data => {
            console.log(data);
            this.masterMeetings = this.convertMasterMeetingsResponse(data);
          }, error => {
            console.error(error);
          });
    }
    convertMasterMeetingsResponse(response: any[]): any {
      return response.map((meeting, index) => ({
          label: meeting.name,
          value: { id: meeting.id, name: meeting.name, code: meeting._id }
      }));
    }

    getMeetings(){
      this.productService.getAllMeetings().subscribe(data => {
        console.log(data);
        data.sort(function(a: any, b: any) {
          var c = new Date(a.updatedDate).getTime();
          var d = new Date(b.updatedDate).getTime();
          return d-c;
        });        
        this.scheduledMeetings = this.convertScheduledMeetingsResponse(data);
        }, error => {
        console.error(error);
        });
    }

    deleteMeeting(record: any){
      this.productService.deleteMeeting(record).subscribe(data => {
        console.log(data);
        this.getMeetings();
        this.display = false;
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Deleted Successfully' });
        }, error => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Occurred' });
        });
    }

    getAllClients(){
      this.productService.getAllClients().subscribe(data => {
        console.log(data);
        }, error => {
        console.error(error);
        });
    }
    getClient(id: any){
      this.selectedClientSupervisionTypeOrClientName = ''
      this.productService.getClient(id).subscribe(data => {
        console.log(data);
        if(data.length > 0)
        {
          this.selectedClientSupervisionTypeOrClientName = "Client Name: "+data[0].clientName;
        }
        else
        {
          this.selectedClientSupervisionTypeOrClientName = "Invalid Client ID/Client Not Found";
        }
      }, error => {
      console.error(error);
      });
    }
    convertScheduledMeetingsResponse(response: any[]): any {
        return response.map((meeting, index) => (
          {
            _id: meeting._id,
            Title: meeting.Title,
            appointmentType: meeting.appointmentType,
            appointmentWith: meeting.appointmentWith,
            apointmentWithCRID: meeting.crId,
            btName: meeting.btName,
            btCRID: meeting.btCRID,
            timezone: meeting.timezone,
            date: meeting.date,
            startTime: meeting.startTime,
            endTime: meeting.endTime,
            supervisorName: meeting.supervisorName,
            supervisorCRID: meeting.supervisorCRID,
            supervisorEmail: meeting.supervisorEmail,
            recordedToBot: meeting.recordedToBot
          }
        ));
      }

    getBTs(){
        this.productService.getAllBTs(this.supervisor).subscribe(data => {
            console.log(data);
            this.BTs = data;
            this.allBTs = data;
            //this.convertBTResponse(data);
          }, error => {
            console.error(error);
          });    
    }

    onDateChanged(){
      if(this.selectedMeeting.name == this.podMeeting)
      {
        this.filterBTs();
      }
    }

    filterBTs(){
      this.selectedMultiBT = [];
      this.BTs = this.allBTs;
      this.podMeetsScheduled = false;
      if(this.selectedMeeting && this.selectedMeeting.name == this.podMeeting)
      {
        if(this.selectedDate >= this.getFirstDayOfCurrentMonth() && this.selectedDate <= this.getLastDayOfCurrentMonth())
        {
          this.selectedMultiBT = this.BTs.filter(bt => {
            const scheduled = this.scheduledMeetings.some(meeting => 
              meeting.btName == bt.btName 
              && meeting.appointmentType == this.podMeeting 
              && new Date(meeting.date) >= this.getFirstDayOfCurrentMonth() 
              && new Date(meeting.date) <= this.getLastDayOfCurrentMonth());
            return !scheduled;
          });
        }
        if(this.selectedDate >= this.getFirstDayOfNextMonth() && this.selectedDate <= this.getLastDayOfNextMonth())
        {
          this.selectedMultiBT = this.BTs.filter(bt => {
            const scheduled = this.scheduledMeetings.some(meeting => 
              meeting.btName == bt.btName 
              && meeting.appointmentType == this.podMeeting 
              && new Date(meeting.date) >= this.getFirstDayOfNextMonth() 
              && new Date(meeting.date) <= this.getLastDayOfNextMonth());
            return !scheduled;
          });
        }
        this.BTs = this.selectedMultiBT;
        this.podMeetsScheduled = this.selectedMultiBT.length == 0;
      }
      else
      {
        this.selectedMultiBT = [];
      }
      
    }
    onMeetingsChanged(){
      this.selectedClient = { value: '' };
      this.selectedClientSupervisionTypeOrClientName = '';
      this.filterBTs();
      let tempArray: any[] = [];
      let BAsupervisionClient = "BA Supervision Client";
      let PMsupervisionClient = "PM Supervision Client";
      let selectedSupervisionTypes: string[] = [];
      let BASupervisionMeetingCategory = ["Monthly POD meeting", "Annual Review", "Individual BT Meeting RBT Supervision", "Group RBT Supervision"];
      if(BASupervisionMeetingCategory.includes(this.selectedMeeting.name?? ""))
      {
        selectedSupervisionTypes.push(BAsupervisionClient);
      }
      else
      {
        selectedSupervisionTypes.push(BAsupervisionClient);
        selectedSupervisionTypes.push(PMsupervisionClient);
      }
      this.allSupervisionClients.forEach((clientInformation: any) => 
      {
        if(selectedSupervisionTypes.includes(clientInformation.supervisionType)){
          tempArray.push(clientInformation);
        }
      });
      this.supervisionClients = this.convertSupervisionResponse(tempArray);
    }

    onClientChange(){
      if(this.selectedClient)
      {
        this.selectedClientSupervisionTypeOrClientName = this.selectedClient.supervisionType;
      }
      else
      {
        this.selectedClientSupervisionTypeOrClientName = null;
      }
    }
    convertBTResponse(response: any[]): any {
        return response.map((bt, index) => ({
          label: bt.btName,
          value: { id: bt._id, name: bt.btName, crId: bt.crID, emailAddress: bt.emailAddress,
            region: bt.region, supervisorName: bt.supervisorName, supervisorCRID: bt.supervisorCRID,
            supervisorEmailAddress: bt.supervisorEmailAddress
        }
        }));
      }

    getSupervisors(){
        this.productService.getSupervisionClients().subscribe(data => {
            console.log(data);
            this.allSupervisionClients = data;
            this.supervisionClients = this.convertSupervisionResponse(data);
          }, error => {
            console.error(error);
          });    
    }
      convertSupervisionResponse(response: any[]): any {
        return response.map((client, index) => ({
          label: client.clientFullName,
          value: { id: client._id, name: client.clientFullName, crId: client.crID, clientName: client.ClientName, providertype: client.providerType, supervisionType: client.supervisionType}
        }));
      }

    saveMeeting()
    {
        var meets: any = [];
        const date = new Date(this.selectedDate);
        const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
      
        const startTime = new Date(this.startTime);
        const formattedStartTime = `${(startTime.getHours() % 12 || 12)}:${startTime.getMinutes().toString().padStart(2, '0')} ${startTime.getHours() >= 12 ? 'PM' : 'AM'}`;
      
        const endTime = new Date(this.endTime);
        const formattedEndTime = `${(endTime.getHours() % 12 || 12)}:${endTime.getMinutes().toString().padStart(2, '0')} ${endTime.getHours() >= 12 ? 'PM' : 'AM'}`;
      
        this.selectedMultiBT.forEach(element => {
            meets.push({title: "Meeting",
            "appointmentType": this.selectedMeeting.name,
            "appointmentWith": this.selectedClient.name,
            "appointmentWithCRID": this.selectedClient.crId,
            "btName": element.btName,
            "btCRID": element.crID,
            "timezone": element.region,
            "date": formattedDate,
            "startTime": formattedStartTime,
            "endTime": formattedEndTime,
            "supervisorName": element.supervisorName,
            "supervisorCRID": element.supervisorCRID,
            "supervisorEmail": element.supervisorEmailAddress,
            "createdDate": new Date(),
            "updatedDate": new Date(),
            "recordedToBot": "False"});
            });
        console.log("selectedMultiBT", this.selectedMultiBT, "Meets", meets,this.selectedMultiBT);
        this.productService.scheduleMeeting(meets).subscribe(data => {
            console.log(data);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Meeting/s scheduled successfully' });
            this.refreshScreen();
          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Occurred' });
            console.error(error);
          }); 
    }
    refreshScreen(){
      this.getMeetings();
      this.selectedDate = "";
      this.startTime = "";
      this.endTime = "";
      this.selectedMeeting = { value: '' };
      this.selectedClient = { value: '' };
      this.selectedMultiBT = [];
      this.selectedClientSupervisionTypeOrClientName = '';
    }
    updateMeeting()
    {
        let formattedDate = this.selectedPopUpDate;
        if (this.selectedPopUpDate instanceof Date) {
            const date = new Date(this.selectedPopUpDate);
            formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
        }
        
        let formattedStartTime = this.selectedPopUpStartTime;
        if (this.selectedPopUpStartTime instanceof Date) {
            const startTime = new Date(this.selectedPopUpStartTime);
            formattedStartTime = `${(startTime.getHours() % 12 || 12)}:${startTime.getMinutes().toString().padStart(2, '0')} ${startTime.getHours() >= 12 ? 'PM' : 'AM'}`;
        }

        let formattedEndTime = this.selectedPopUpEndTime;
        if(this.selectedPopUpEndTime instanceof Date)
        {
            const endTime = new Date(this.selectedPopUpEndTime);
            formattedEndTime = `${(endTime.getHours() % 12 || 12)}:${endTime.getMinutes().toString().padStart(2, '0')} ${endTime.getHours() >= 12 ? 'PM' : 'AM'}`;    
        }
        
        var update = {
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            appointmentWith: this.selectedPopUpAppointmentWith.name,
            appointmentWithCRID: this.selectedPopUpAppointmentWith.crId,
            date: formattedDate,
            updatedDate: new Date()
        };
        
        this.productService.updateMeeting(update, this.displayPopupMeeting._id).subscribe(data => {
            console.log(data);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Meeting Updated successfully' });
            this.getMeetings();
            this.display = false;
          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Occurred' });
            console.error(error);
          });
    }
    filterCountry(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
    selectedState: any = null;

    compareTwoTimesM(){}
    
    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    getFirstDayOfNextMonth(){
      const currentDate = new Date();

      const nextMonth = currentDate.getMonth() + 1;

      const firstDayOfNextMonth = new Date(currentDate.getFullYear(), nextMonth, 1);

      return firstDayOfNextMonth;
    }

    getLastDayOfNextMonth(){
      const currentDate = new Date();

      const nextMonth = currentDate.getMonth() + 1;

      const firstDayOfNextMonth = new Date(currentDate.getFullYear(), nextMonth, 1);

      const lastDayOfCurrentMonth = new Date(firstDayOfNextMonth.getTime() - 1);

      const lastDayOfNextMonth = new Date(lastDayOfCurrentMonth.getFullYear(), lastDayOfCurrentMonth.getMonth() + 2, 0);

      return lastDayOfNextMonth;
    }

    getLastDayOfCurrentMonth(){
      const currentDate = new Date();

      const nextMonth = currentDate.getMonth() + 1;

      const firstDayOfNextMonth = new Date(currentDate.getFullYear(), nextMonth, 1);

      const lastDayOfCurrentMonth = new Date(firstDayOfNextMonth.getTime() - 1);

      return lastDayOfCurrentMonth;
    }

    getFirstDayOfCurrentMonth(){
      const currentDate = new Date();

      const thisMonth = currentDate.getMonth();

      const firstDayOfNextMonth = new Date(currentDate.getFullYear(), thisMonth, 1);

      return firstDayOfNextMonth;
    }
    confirm2(event: Event) {
      this.confirmationService.confirm({
          key: 'confirm2',
          target: event.target || new EventTarget,
          message: 'Are you sure that you want to delete this Meeting?',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.deleteMeeting(this.displayPopupMeeting._id);
          },
          reject: () => {
              // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
          }
      });
  }
}
