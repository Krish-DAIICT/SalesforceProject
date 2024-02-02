import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { SalesforceService } from '../salesforce.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-query-res',
  templateUrl: './query-res.component.html',
  styleUrl: './query-res.component.scss',
})
export class QueryResComponent {
  @Input() query_res: any;
  @Input() selectedFieldsArray!: string[];
  @Input() selectedObject!: string|null;
  fields: string[] = [];
  @Input() isEditOpen?: boolean = false;
  @Output() editStatusChange = new EventEmitter<boolean>();

  result: any = [];

  constructor(
    private salesforceService: SalesforceService,
    private router: Router
  ) {}

  ngOnChanges(): void {
  }

  isRelationshipField(fieldName: string): any {
    const objectMetadata = this.salesforceService.getObjectMetadata(
      (this.selectedObject) 
    ); // Implement this method

    objectMetadata.pipe(map((response: any) => response.fields)).subscribe(
      (fields) => {
        this.fields = fields;
        console.log('Object metadata fetched:', fields);
      },
      (error) => {
        console.error('Error fetching object metadata:', error);
      }
    );
  }

  editRecord(url: string): void {
    this.isEditOpen = true;
    localStorage.setItem('url', url);
    this.editStatusChange.emit(this.isEditOpen);
    // this.router.navigate([`edit`, url])
  }

  deleteRecord(url: string): void {
    let permit: boolean = confirm('Are you sure you want to Delete object?');

    if (permit) {
      this.salesforceService.deleteRecord(url).subscribe({
        next: (val) => {
          console.log(val);
          alert('Record deleted successfully!!');
          this.updateRecord(url);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
    return;
  }

  updateRecord(url: string): void {
    this.salesforceService
      .querySalesforce(this.selectedObject, this.selectedFieldsArray)
      .subscribe({
        next: (val) => {
          this.result = val.records;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
