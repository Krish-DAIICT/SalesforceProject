import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SalesforceActions from './salesforce.actions';
import { SalesforceService } from '../salesforce.service';

@Injectable()
export class SalesforceEffects {
  // Fetch Objects Effect
  fetchObjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SalesforceActions.fetchObjects),
      mergeMap(() =>
        this.salesforceService.fetchObjects().pipe(
          map((objects: string[]) => SalesforceActions.fetchObjectsSuccess({ objects })),
          catchError((error) => of(SalesforceActions.fetchObjectsFailure({ error })))
        )
      )
    )
  );

  // Fetch Fields Effect
  fetchFields$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SalesforceActions.fetchFields),
      mergeMap(({ object }) =>
        this.salesforceService.fetchFields(object).pipe(
          map((fields: string[]) => SalesforceActions.fetchFieldsSuccess({ fields })),
          catchError((error) => of(SalesforceActions.fetchFieldsFailure({ error })))
        )
      )
    )
  );

  // Query Salesforce Effect
  querySalesforce$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SalesforceActions.querySalesforce),
      mergeMap(({ selectedObject, selectedFields }) =>
        this.salesforceService.querySalesforce(selectedObject, selectedFields).pipe(
          map((results: any[]) => SalesforceActions.querySalesforceSuccess({ results })),
          catchError((error) => of(SalesforceActions.querySalesforceFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private salesforceService: SalesforceService) {}
}
