import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SalesforceService } from '../salesforce.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {
  desc: any = [];
  record: any = [];
  @Input() url!: string|null;

  @Input() isEditOpen?: boolean = true;
  @Output() editStatusChange = new EventEmitter<boolean>();

  updatableFields: boolean[] = [];
  updatableFieldNames: string[] = [];
  nonUpdatableFieldNames: string[] = [];

  constructor(
    private salesforceService: SalesforceService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.url = localStorage.getItem('url');
    if (!this.url) {
      alert('URL not found!!!');
      router.navigate(['']);
    } else {
      this.fetchRecord(this.url);
    }
  }

  fetchRecord(url: string) {
    this.fetchDescription(url);
    this.salesforceService.fetchRecord(url).subscribe({
      next: ((val) => {
        console.log(val);
        this.record = val;
        // Manually trigger change detection after updating the record
        this.cdr.detectChanges();
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
            this.updatableFields = this.desc.map((field: { updateable: boolean }) => field.updateable === true);

            this.updatableFieldNames = this.desc
              .filter((field: any, index: number) => this.updatableFields[index])
              .map((field: any) => field.name);

            this.nonUpdatableFieldNames = this.desc
              .filter((field: any, index: number) => !this.updatableFields[index])
              .map((field: any) => field.name);
          }

          console.log('Updatable Fields:', this.updatableFieldNames);
          console.log('Non-Updatable Fields:', this.nonUpdatableFieldNames);
          // Manually trigger change detection after updating the description
          this.cdr.detectChanges();
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

    if (this.url) this.salesforceService.updateRecord(this.url, payload).subscribe({
      next: () => {
        console.log('Record updated successfully:');
        confirm('Updates saved successfully!!');
        this.isEditOpen = false;
        this.editStatusChange.emit(this.isEditOpen);
      },
      error: (err) => {
        console.error('Error updating record:', err);
      },
    });
  }
}
