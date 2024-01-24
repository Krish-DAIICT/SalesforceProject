import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesforceService {

  sobjectUrl: string = 'https://valorx9-dev-ed.develop.my.salesforce.com/services/data/v58.0/sobjects';
  fieldURL: string = 'https://valorx9-dev-ed.develop.my.salesforce.com/services/data/v58.0/sobjects/';
  queryUrl: string = 'https://valorx9-dev-ed.develop.my.salesforce.com/services/data/v58.0';
  salesforceBaseUrl: string = 'https://valorx9-dev-ed.develop.my.salesforce.com/';

  constructor(private http: HttpClient) { }

  fetchObjects(): Observable<string[]> {
    return this.http.get(this.sobjectUrl).pipe(
      map((res) => {
        if (res && (res as any)['sobjects']) {
          // Extract and log sobject names
          return (res as any)['sobjects'].map((sobject: any) => sobject.name);
        } else {
          console.error('Invalid response format. Missing "sobjects" property.');
          return []; // Return an empty array or handle the error as needed
        }
      })
    );
  }

  fetchFields(object: string): Observable<string[]> {
    const url = this.fieldURL + object + '/describe';
    return this.http.get(url).pipe(
      map((res: any) => {
        if (res && res.fields) {
          // Extract and return field names
          const fieldNames = res.fields.map((field: any) => field.name);
          // console.log(fieldNames);
          return fieldNames;
        } else {
          console.error('Invalid response format. Missing "fields" property.');
          return []; // Return an empty array or handle the error as needed
        }
      })
    );
  }

  querySalesforce(selectedObject: string, selectedFields: string[]): Observable<any> {
    const fieldList = selectedFields.join(',');
    const query = `SELECT+${fieldList}+FROM+${selectedObject}`;
    const url = `${this.queryUrl}/query/?q=${query}`;
    return this.http.get(url);
  }

  getObjectMetadata(objectName: string): Observable<any> {
    const url = `${this.salesforceBaseUrl}/services/data/v58.0/sobjects/${objectName}/describe`;
    return this.http.get<any>(url);
  }

  deleteRecord(recordUrl: string): Observable<any> {
    const url: string = `${this.salesforceBaseUrl}/${recordUrl}`;
    return this.http.delete<any>(url);
  }

  fetchRecord(recordUrl: string): Observable<any> {
    const url: string = `${this.salesforceBaseUrl}/${recordUrl}`;
    return this.http.get<any>(url);
  }

  getObjectNameFromUrl(url: string): string | null {
    const parts = url.split('/');
  
    const sobjectsIndex = parts.indexOf('sobjects');
  
    if (sobjectsIndex !== -1 && sobjectsIndex < parts.length - 1) {
      return parts[sobjectsIndex + 1];
    }

    return null;
  }

  updateRecord(url: string, obj: any){
    const updateUrl = `${this.salesforceBaseUrl}/${url}`;
    return this.http.patch(updateUrl, obj);
  }
}
