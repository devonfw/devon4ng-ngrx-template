import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../../core/security/auth.service';
import { SampleDataService } from '../../../sampledata/services/sampledata.service';
import { SampledataModel } from '../../models/sampledata.model';
import {
  SampleDataActionTypes,
  AddData,
  AddDataSuccess,
  AddDataFail,
  DeleteDataSuccess,
  DeleteDataFail,
  EditData,
  EditDataSuccess,
  EditDataFail,
  DeleteData,
  LoadData,
  LoadDataSuccess,
} from '../actions/sampledata.actions';
import { Action } from '@ngrx/store';
import { LoadDataFail } from '../actions/sampledata.actions';
@Injectable()
export class SampleDataEffects {
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
            (sampledata: SampledataModel[]) => new LoadDataSuccess(sampledata),
          ),
          catchError((error: any) => of(new LoadDataFail({ error: error }))),
        );
    }),
  );
  @Effect()
  addData: Observable<Action> = this.actions.pipe(
    ofType(SampleDataActionTypes.ADD_DATA),
    map((action: AddData) => action.payload),
    switchMap((payload: SampledataModel) => {
      return this.sampledataservice.saveSampleData(payload).pipe(
        map((adddata: SampledataModel) => new AddDataSuccess(adddata)),
        catchError((error: Error) => of(new AddDataFail({ error: error }))),
      );
    }),
  );

  @Effect()
  deleteData: Observable<Action> = this.actions.pipe(
    ofType(SampleDataActionTypes.DELETE_DATA),
    map((action: DeleteData) => action.payload),
    switchMap((payload: SampledataModel) => {
      return this.sampledataservice.deleteSampleData(payload.id).pipe(
        map(() => new DeleteDataSuccess({ id: payload.id })),
        catchError((error: Error) => of(new DeleteDataFail({ error: error }))),
      );
    }),
  );

  @Effect()
  editData: Observable<Action> = this.actions.pipe(
    ofType(SampleDataActionTypes.EDIT_DATA),
    map((action: EditData) => action.payload),
    switchMap((payload: SampledataModel) => {
      return this.sampledataservice.editSampleData(payload).pipe(
        map((editdata: SampledataModel) => new EditDataSuccess(editdata)),
        catchError((error: Error) => of(new EditDataFail({ error: error }))),
      );
    }),
  );

  constructor(
    private actions: Actions,
    public authservice: AuthService,
    private sampledataservice: SampleDataService,
  ) {}
}
