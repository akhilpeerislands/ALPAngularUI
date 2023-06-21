import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';
import { Appointment, Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { DataView } from 'primeng/dataview';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { Schedule } from 'src/app/demo/components/utilities/interfaces/schedule';
@Component({
    templateUrl: './newHireScheduler.component.html',
    providers: [MessageService]

})
export class NewHireSchedulerComponent {

    uploadedFiles: any[] = [];
    true = true;
    tableData: any;
    constructor(private messageService: MessageService, private productService: ProductService) { }


    onFileChange(event: any) {
        /* wire up file reader */
        for (const file of event.files) {
            this.uploadedFiles.push(file);
            //     const target: DataTransfer = <DataTransfer>(event.target);
            // if (target.files.length !== 1) {
            //   throw new Error('Cannot use multiple files');
            // }
            const reader: FileReader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = (e: any) => {
                /* create workbook */
                const binarystr: string = e.target.result;
                const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

                /* selected the first sheet */
                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];

                /* save data */
                this.tableData = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
                console.log(this.tableData); // Data will be logged in array format containing objects
            };
        }

    }
    schedule(){
        let schedules = this.prepareScheduleData();
        this.productService.scheduleMeeting
    }
    prepareScheduleData(): Schedule[] {
        let schedules: Schedule[] = [];
        let newSchedule: Schedule;
        this.tableData.forEach((sch: any) => {
            let formattedStartTime = this.formatTime(sch["Start Time"]);
            let formattedEndTime = this.formatTime(sch["End Time"]);
            newSchedule.btName = sch["BT Name"];
            newSchedule.btCRID = sch["BT CR ID"];
            newSchedule.appointmentWith = sch["Supervisor Name"];
            newSchedule.appointmentWith = sch["Supervisor CR ID"];
            newSchedule.date = this.numberToDate(sch["Date"]);
            newSchedule.startTime = formattedStartTime;
            newSchedule.endTime = formattedEndTime;
            newSchedule.title = "Meeting";
            newSchedule.appointmentType = sch["Appointment Type"];
            newSchedule.requestedSupervisor = this.productService.getSupervisor();
            newSchedule.timezone = sch["Timezone"];
            newSchedule.supervisorEmail = this.productService.getSupervisorEmail();
            newSchedule.createdDate = new Date();
            newSchedule.updatedDate = new Date();
            newSchedule.recordedToBot = "False";
            schedules.push(newSchedule);
        });
        return schedules;
    }
    numberToDate(number: number): string {
        const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const baseDate = new Date("1900-01-01"); // Base date for Excel serial date system

        // Calculate the number of days from the base date
        const days = number - 1;
        const dateInMs = baseDate.getTime() + days * msPerDay;

        // Create a new Date object with the calculated milliseconds
        const convertedDate = new Date(dateInMs);

        // Extract the month, day, and year from the converted date
        const month = convertedDate.getMonth() + 1; // Months are zero-based, so add 1
        const day = convertedDate.getDate();
        const year = convertedDate.getFullYear();

        // Return the formatted date string
        return `${month}/${day}/${year}`;
    }

    formatTime(time: any) {
        const hours = Math.floor(time * 24);
        const minutes = Math.round((time * 24 - hours) * 60);
        const period = hours >= 12 ? 'PM' : 'AM';
        const twelveHourFormat = hours % 12 || 12; // Convert hours to 12-hour format
        const formattedTime = `${twelveHourFormat}:${minutes.toString().padStart(2, '0')} ${period}`;
        return formattedTime;
    }
    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    onBasicUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }
}
