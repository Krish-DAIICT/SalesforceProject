// salesforce.selectors.ts
// Path: src/app/store/salesforce.selectors.ts

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SalesforceState } from './salesforce.reducer';

export const selectSalesforceState = createFeatureSelector<SalesforceState>('salesforce');

export const selectObjects = createSelector(
  selectSalesforceState,
  (state: SalesforceState) => state.objects
);

export const selectSelectedObject = createSelector(
  selectSalesforceState,
  (state: SalesforceState) => state.selectedObject
);

export const selectFieldList = createSelector(
  selectSalesforceState,
  (state: SalesforceState) => state.fieldList
);

export const selectFields = createSelector(
  selectSalesforceState,
  (state: SalesforceState) => state.fields
);

export const selectResults = createSelector(
  selectSalesforceState,
  (state: SalesforceState) => state.results
);

export const selectError = createSelector(
  selectSalesforceState,
  (state: SalesforceState) => state.error
);
