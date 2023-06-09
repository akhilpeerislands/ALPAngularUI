import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';
import { Appointment, Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { DataView } from 'primeng/dataview';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './newHireScheduler.component.html',
    providers: [MessageService]

})
export class NewHireSchedulerComponent {
    
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {}

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
