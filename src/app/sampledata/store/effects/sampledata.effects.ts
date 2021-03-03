import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../core/security/auth.service';
import { SampleDataService } from '../../../sampledata/services/sampledata.service';
import { HttpResponseModel } from '../../models/httpresponse.model';
import { SampleDataModel } from '../../models/sampledata.model';
import { SearchCriteriaDataModel } from '../../models/searchcriteriadata.model';
import * as sampleDataActions from '../actions/sampledata.actions';

/* @export
 * @class SampleDataEffects
 */
@Injectable()
export class SampleDataEffects {
  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  loadData$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(sampleDataActions.loadData),
      map((action) => action.sampleDataModel),
      switchMap((payload: SampleDataModel) =>
        this.sampledataservice
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
              of(sampleDataActions.loadDataFail({ error })),
            ),
          ),
      ),
    ),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  createData$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(sampleDataActions.createData),
      map((action) => action.searchCriteriaDataModel),
      switchMap((searchCriteriaDataModel: SearchCriteriaDataModel) =>
        this.sampledataservice
          .saveSampleData(searchCriteriaDataModel.data)
          .pipe(
            map((data: SampleDataModel) => {
              const criteriaDataModel: SearchCriteriaDataModel = {
                criteria: searchCriteriaDataModel.criteria,
                data,
              };
              return sampleDataActions.createDataSuccess({
                searchCriteriaDataModel: criteriaDataModel,
              });
            }),
            catchError((error: Error) =>
              of(sampleDataActions.createDataFail({ error })),
            ),
          ),
      ),
    ),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  createDataSuccess$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(sampleDataActions.createDataSuccess),
      map((action) =>
        sampleDataActions.loadData({
          sampleDataModel: action.searchCriteriaDataModel.criteria,
        }),
      ),
    ),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  deleteData$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(sampleDataActions.deleteData),
      map((action) => action.searchCriteriaDataModel),
      switchMap((searchCriteriaDataModel: SearchCriteriaDataModel) =>
        this.sampledataservice
          .deleteSampleData(searchCriteriaDataModel.data.id)
          .pipe(
            map(() =>
              sampleDataActions.deleteDataSuccess({ searchCriteriaDataModel }),
            ),
            catchError((error: Error) =>
              of(sampleDataActions.deleteDataFail({ error })),
            ),
          ),
      ),
    ),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  deleteDataSuccess$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(sampleDataActions.deleteDataSuccess),
      map((action) =>
        sampleDataActions.loadData({
          sampleDataModel: action.searchCriteriaDataModel.data,
        }),
      ),
    ),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  updateData$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(sampleDataActions.updateData),
      map((action) => action.searchCriteriaDataModel),
      switchMap((searchCriteriaDataModel: SearchCriteriaDataModel) =>
        this.sampledataservice
          .editSampleData(searchCriteriaDataModel.data)
          .pipe(
            map((editdata: SampleDataModel) => {
              const update: Update<SampleDataModel> = {
                id: editdata.id,
                changes: {
                  name: editdata.name,
                  surname: editdata.surname,
                  age: editdata.age,
                  email: editdata.email,
                },
              };
              return sampleDataActions.updateDataSuccess({
                criteria: searchCriteriaDataModel.criteria,
                data: update,
              });
            }),
            catchError((error: Error) =>
              of(sampleDataActions.updateDataFail({ error })),
            ),
          ),
      ),
    ),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  updateDataSuccess$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(sampleDataActions.updateDataSuccess),
      map((action) =>
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
