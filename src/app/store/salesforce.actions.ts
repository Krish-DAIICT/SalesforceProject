import { createAction, props } from '@ngrx/store';

// Fetch Objects
export const fetchObjects = createAction('[Salesforce] Fetch Objects');
export const fetchObjectsSuccess = createAction('[Salesforce] Fetch Objects Success', props<{ objects: string[] }>());
export const fetchObjectsFailure = createAction('[Salesforce] Fetch Objects Failure', props<{ error: any }>());

// Fetch Fields
export const fetchFields = createAction('[Salesforce] Fetch Fields', props<{ object: string }>());
export const fetchFieldsSuccess = createAction('[Salesforce] Fetch Fields Success', props<{ fields: string[] }>());
export const fetchFieldsFailure = createAction('[Salesforce] Fetch Fields Failure', props<{ error: any }>());

// Query Salesforce
export const querySalesforce = createAction('[Salesforce] Query Salesforce', props<{ selectedObject: string, selectedFields: string[] }>());
export const querySalesforceSuccess = createAction('[Salesforce] Query Salesforce Success', props<{ results: any[] }>());
export const querySalesforceFailure = createAction('[Salesforce] Query Salesforce Failure', props<{ error: any }>());

// Other actions as needed
