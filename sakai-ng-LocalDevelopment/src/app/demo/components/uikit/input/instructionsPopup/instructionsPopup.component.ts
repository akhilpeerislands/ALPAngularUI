import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';
import { Appointment, Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { DataView } from 'primeng/dataview';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-instructions-popup',
    templateUrl: './instructionsPopup.component.html',
    providers: [MessageService]

})
export class InstructionsPopupComponent implements OnInit{
    
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {}

  @Input() display = false;

  @Output() close = new EventEmitter<string>();

  @Input() instructions: any;

  closePopup() {
    this.close.emit();
  }

  ngOnInit(){
    console.log(this.instructions);
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
