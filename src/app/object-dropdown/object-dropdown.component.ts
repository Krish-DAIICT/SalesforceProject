import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { SalesforceService } from '../salesforce.service';
import { map, pipe } from 'rxjs';

@Component({
  selector: 'app-object-dropdown',
  templateUrl: './object-dropdown.component.html',
  styleUrls: ['./object-dropdown.component.scss'],
})
export class ObjectDropdownComponent implements OnInit, OnChanges {
  objlist: string[] = [];
  selectedObject: string = '';
  selectedFields: { [key: string]: boolean } = {};
  fieldList: string[] = [];
  selectedFieldsArray: string[] = [];
  query_res: any = [];

  isQueryResVisible: boolean = false;
  isEditOpen: boolean = false;

  constructor(private salesforceService: SalesforceService) {
    this.isEditOpen = false;
  }

  ngOnInit(): void {
    this.salesforceService.fetchObjects().subscribe((val) => {
      this.objlist = val;
    });
  }

  updateFieldList() {
    this.resetArrays();
    this.resetQueryRes();
    this.getFieldList(this.selectedObject);
  }

  getFieldList(objectName: string): void {
    this.salesforceService.fetchFields(objectName).subscribe((val) => {
      this.fieldList = val;
    });
  }

  getSelectedFields(): string[] {
    this.updateSelectedFieldsArray();
    return Object.keys(this.selectedFields).filter(
      (field) => this.selectedFields[field]
    );
  }

  updateSelectedFields(field: string) {
    this.selectedFields[field] = !this.selectedFields[field];
    this.resetQueryRes();
    this.updateSelectedFieldsArray();
  }

  updateSelectedFieldsArray() {
    this.selectedFieldsArray = Object.keys(this.selectedFields).filter(
      (field) => this.selectedFields[field]
    );
  }

  removeSelectedField(field: string) {
    delete this.selectedFields[field];
    this.updateSelectedFieldsArray();

    this.fieldList.forEach((f) => {
      if (f === field) {
        this.selectedFields[f] = false;
      }
    });
  }

  getProperty() {
    this.updateSelectedFieldsArray();
    console.log(this.selectedFieldsArray);
  }

  executeQuery() {
    this.isQueryResVisible = true;
    this.query_res = [];
    this.salesforceService
      .querySalesforce(this.selectedObject, this.selectedFieldsArray)
      .subscribe({
        next: (val) => {
          this.query_res = val.records;
          if (val.records.length === 0) confirm('No record found!!');
          else this.isEditOpen = false;
        },
        error: (error) => {
          console.error('Error querying Salesforce:', error);
        },
      });
  }

  resetArrays() {
    this.selectedFields = {};
    this.selectedFieldsArray = [];
    this.query_res = [];
  }

  resetQueryRes() {
    this.isQueryResVisible = false;
    this.query_res = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("In cahnges")
    if (changes['isEditOpen']) {
      const isNewValueTrue = changes['isEditOpen'].currentValue === true;
      const wasPreviousValueFalse = changes['isEditOpen'].previousValue === false;

      if (isNewValueTrue && wasPreviousValueFalse) {
        console.log("Executing")
        this.executeQuery();
      }
    }
  }

  onIsEditOpenChange(isEditOpen: boolean) {
    if (!isEditOpen) {
      this.isEditOpen = isEditOpen;
      this.executeQuery();
    }
  }
}
