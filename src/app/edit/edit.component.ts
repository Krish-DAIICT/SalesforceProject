import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SalesforceService } from '../salesforce.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  desc: any = [];
  record: any = [];
  @Input() url!: string|null;

  @Input() isEditOpen?:boolean = true;
  @Output() editStatusChange = new EventEmitter<boolean>();

  updatableFields: boolean[] = [];
  updatableFieldNames: string[] = [];
  nonUpdatableFieldNames: string[] = [];

  constructor(private salesforceService: SalesforceService, private route: ActivatedRoute, private router: Router) {
    // this.url = route.snapshot.params['url'];
    // console.log(this.url);
    this.url = localStorage.getItem('url');
    if(!this.url) {
      alert("URL not found!!!");
      router.navigate(['']);
    }else{
      this.fetchRecord(this.url);
    }
  }

  fetchRecord(url: string) {
    this.fetchDescription(url);
    // .. //
    this.salesforceService.fetchRecord(url).subscribe({
      next: ((val) => {
        console.log(val);
        this.record = val;
      }),
      error: (err) => console.error(err),
    });
  }

  fetchDescription(url: string) {
    const obj: string | null = this.salesforceService.getObjectNameFromUrl(url);

    if (obj !== null) {
      this.salesforceService.getObjectMetadata(obj).subscribe({
        next: (val) => {
          console.log(val.fields);
          this.desc = val.fields;

          if (this.desc) {
            this.updatableFields = this.desc.map((field: { updateable: boolean; }) => field.updateable === true);

            this.updatableFieldNames = this.desc
              .filter((field: any, index: number) => this.updatableFields[index])
              .map((field: any) => field.name);

            this.nonUpdatableFieldNames = this.desc
              .filter((field: any, index: number) => !this.updatableFields[index])
              .map((field: any) => field.name);
          }

          console.log('Updatable Fields:', this.updatableFieldNames);
          console.log('Non-Updatable Fields:', this.nonUpdatableFieldNames);
        },
        error: (err) => console.error(err),
      });
    }
  }

  submitForm() {
    const payload: any = {};

    for (const field of this.desc) {
      if (field.updateable) {
        payload[field.name] = this.record[field.name];
      }
    }

    // console.log(payload)
  
    if(this.url) this.salesforceService.updateRecord(this.url, payload).subscribe({
      next: () => {
        console.log('Record updated successfully:');
        confirm("Updates saved successfully!!");
        this.isEditOpen = false;
        this.editStatusChange.emit(this.isEditOpen);
        // this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Error updating record:', err);
      },
    });
  }
}
