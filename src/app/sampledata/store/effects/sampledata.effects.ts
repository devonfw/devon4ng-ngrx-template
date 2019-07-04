import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../../core/security/auth.service';
import { SampleDataService } from '../../../sampledata/services/sampledata.service';
import { SampleDataModel } from '../../models/sampledata.model';
import {
  SampleDataActionTypes,
  CreateData,
  CreateDataSuccess,
  CreateDataFail,
  DeleteDataSuccess,
  DeleteDataFail,
  UpdateData,
  UpdateDataSuccess,
  UpdateDataFail,
  DeleteData,
  LoadData,
  LoadDataSuccess,
} from '../actions/sampledata.actions';
import { Action } from '@ngrx/store';
import { LoadDataFail } from '../actions/sampledata.actions';
import { Update } from '@ngrx/entity';
import { HttpResponseModel } from '../../models/httpresponse.model';
import { SearchCriteriaDataModel } from '../../models/searchcriteriadata.model';

/* @export
 * @class SampleDataEffects
 */
@Injectable()
export class SampleDataEffects {
  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  @Effect()
  loadData: Observable<Action> = this.actions.pipe(
    ofType(SampleDataActionTypes.LOAD_DATA),
    map((action: LoadData) => action.payload),
    switchMap((payload: any) => {
      return this.sampledataservice
        .getSampleData(
          payload.size,
          payload.page,
          payload.searchTerms,
          payload.sort,
        )
        .pipe(
          map(
            (sampledataRes: HttpResponseModel) =>
              new LoadDataSuccess(sampledataRes),
          ),
          catchError((error: Error) => of(new LoadDataFail({ error: error }))),
        );
    }),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  @Effect()
  addData: Observable<Action> = this.actions.pipe(
    ofType(SampleDataActionTypes.CREATE_DATA),
    map((action: CreateData) => action.payload),
    switchMap((payload: SearchCriteriaDataModel) => {
      return this.sampledataservice.saveSampleData(payload.data).pipe(
        map(
          (adddata: SampleDataModel) =>
            new CreateDataSuccess({
              criteria: payload.criteria,
              data: adddata,
            }),
        ),
        catchError((error: Error) => of(new CreateDataFail({ error: error }))),
      );
    }),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  @Effect()
  addDataSuccess: Observable<Action> = this.actions.pipe(
    ofType(SampleDataActionTypes.CREATE_DATA_SUCCESS),
    map((action: CreateDataSuccess) => new LoadData(action.payload.criteria)),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  @Effect()
  deleteData: Observable<Action> = this.actions.pipe(
    ofType(SampleDataActionTypes.DELETE_DATA),
    map((action: DeleteData) => action.payload),
    switchMap((payload: SearchCriteriaDataModel) => {
      return this.sampledataservice.deleteSampleData(payload.data.id).pipe(
        map(() => new DeleteDataSuccess(payload)),
        catchError((error: Error) => of(new DeleteDataFail({ error: error }))),
      );
    }),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  @Effect()
  deleteDataSuccess: Observable<Action> = this.actions.pipe(
    ofType(SampleDataActionTypes.DELETE_DATA_SUCCESS),
    map((action: DeleteDataSuccess) => new LoadData(action.payload.criteria)),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  @Effect()
  editData: Observable<Action> = this.actions.pipe(
    ofType(SampleDataActionTypes.UPDATE_DATA),
    map((action: UpdateData) => action.payload),
    switchMap((payload: SearchCriteriaDataModel) => {
      return this.sampledataservice.editSampleData(payload.data).pipe(
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

          return new UpdateDataSuccess({
            criteria: payload.criteria,
            data: update,
          });
        }),
        catchError((error: Error) => of(new UpdateDataFail({ error: error }))),
      );
    }),
  );

  /* @type {Observable<Action>}
   * @memberof SampleDataEffects
   */
  @Effect()
  editDataSuccess: Observable<Action> = this.actions.pipe(
    ofType(SampleDataActionTypes.UPDATE_DATA_SUCCESS),
    map((action: UpdateDataSuccess) => new LoadData(action.payload.criteria)),
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
