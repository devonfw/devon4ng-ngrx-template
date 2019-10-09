import { Injectable } from '@angular/core';

import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { map, switchMap, catchError, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../../../../core/security/auth.service';
import { SampleDataService } from '../../../sampledata/services/sampledata.service';
import { SampleDataModel } from '../../models/sampledata.model';
import * as sampleDataActions from '../actions/sampledata.actions';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { HttpResponseModel } from '../../models/httpresponse.model';
import { SearchCriteriaDataModel } from '../../models/searchcriteriadata.model';
import { TypedAction } from '@ngrx/store/src/models';

/* @export
 * @class SampleDataEffects
 */
@Injectable()
export class SampleDataEffects {
  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  loadData: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(sampleDataActions.loadData),
      map(action => {
        return action.sampleDataModel;
      }),
      switchMap((payload: SampleDataModel) => {
        return this.sampledataservice
          .getSampleData(
            payload.size,
            payload.page,
            payload.searchTerms,
            payload.sort,
          )
          .pipe(
            map((httpResponseModel: HttpResponseModel) =>
              sampleDataActions.loadDataSuccess({ httpResponseModel }),
            ),
            catchError((error: Error) =>
              of(sampleDataActions.loadDataFail({ error: error })),
            ),
          );
      }),
    ),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  addData: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(sampleDataActions.createData),
      map(action => action.searchCriteriaDataModel),
      switchMap((searchCriteriaDataModel: SearchCriteriaDataModel) => {
        return this.sampledataservice
          .saveSampleData(searchCriteriaDataModel.data)
          .pipe(
            map((data: SearchCriteriaDataModel) => {
              return sampleDataActions.createDataSuccess({
                searchCriteriaDataModel: searchCriteriaDataModel,
              });
            }),
            catchError((error: Error) =>
              of(sampleDataActions.createDataFail({ error: error })),
            ),
          );
      }),
    ),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  addDataSuccess: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(sampleDataActions.createDataSuccess),
      map(action => {
        return sampleDataActions.loadData({
          sampleDataModel: action.searchCriteriaDataModel.criteria,
        });
      }),
    ),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  deleteData: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(sampleDataActions.deleteData),
      map(action => action.searchCriteriaDataModel),
      switchMap((searchCriteriaDataModel: SearchCriteriaDataModel) => {
        return this.sampledataservice
          .deleteSampleData(searchCriteriaDataModel.data.id)
          .pipe(
            map(() =>
              sampleDataActions.deleteDataSuccess({ searchCriteriaDataModel }),
            ),
            catchError((error: Error) =>
              of(sampleDataActions.deleteDataFail({ error: error })),
            ),
          );
      }),
    ),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  deleteDataSuccess: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(sampleDataActions.deleteDataSuccess),
      map(action =>
        sampleDataActions.loadData({
          sampleDataModel: action.searchCriteriaDataModel.data,
        }),
      ),
    ),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  editData: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(sampleDataActions.updateData),
      map(action => action.searchCriteriaDataModel),
      switchMap((searchCriteriaDataModel: SearchCriteriaDataModel) => {
        return this.sampledataservice
          .editSampleData(searchCriteriaDataModel.data)
          .pipe(
            map((editdata: SampleDataModel) => {
              const update: Update<SampleDataModel> = {
                id: editdata.id,
                changes: {
                  name: editdata.name,
                  surname: editdata.surname,
                  age: editdata.age,
                  mail: editdata.mail,
                },
              };
              searchCriteriaDataModel.data = update;
              return sampleDataActions.updateDataSuccess({
                criteria: searchCriteriaDataModel.criteria,
                data: update,
              });
            }),
            catchError((error: Error) =>
              of(sampleDataActions.updateDataFail({ error: error })),
            ),
          );
      }),
    ),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  editDataSuccess: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(sampleDataActions.updateDataSuccess),
      map(action =>
        sampleDataActions.loadData({
          sampleDataModel: action.criteria,
        }),
      ),
    ),
  );

  /* Creates an instance of SampleDataEffects.
   * @param {Actions} actions
   * @param {AuthService} authservice
   * @param {SampleDataService} sampledataservice
   * @memberof SampleDataEffects
   */
  constructor(
    private actions: Actions,
    public authservice: AuthService,
    private sampledataservice: SampleDataService,
  ) {}
}
