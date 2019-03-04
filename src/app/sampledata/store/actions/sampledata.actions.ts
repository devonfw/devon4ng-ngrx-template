import { Action } from '@ngrx/store';
import { SampledataModel } from '../../models/sampledata.model';
export enum SampleDataActionTypes {
  LOAD_DATA = '[SampleData] LoadData ',
  LOAD_DATA_SUCCESS = '[SampleData] LoadDataSuccess ',
  LOAD_DATA_FAIL = '[SampleData] LoadDataFail',
  SEARCH_DATA = '[SampleData] SearchData',
  SEARCH_DATA_SUCCESS = '[SampleData] SearchDataSuccess',
  ADD_DATA = '[SampleData] Add',
  ADD_DATA_SUCCESS = '[SampleData] AddDataSuccess',
  ADD_DATA_FAIL = '[SampleData] AddDataFail',
  DELETE_DATA = '[SampleData] Delete',
  DELETE_DATA_SUCCESS = '[SampleData] DeleteSuccess',
  DELETE_DATA_FAIL = '[SampleData] DeleteDataFail',
  EDIT_DATA = '[SampleData] EditData',
  EDIT_DATA_FAIL = '[SampleData] EditDataFail',
  EDIT_DATA_SUCCESS = '[SampleData] EditDataSuccess',
}
export class LoadData implements Action {
  readonly type: SampleDataActionTypes.LOAD_DATA =
    SampleDataActionTypes.LOAD_DATA;
  constructor(public payload: SampledataModel) {}
}
export class LoadDataSuccess implements Action {
  readonly type: SampleDataActionTypes.LOAD_DATA_SUCCESS =
    SampleDataActionTypes.LOAD_DATA_SUCCESS;
  constructor(public payload: SampledataModel[]) {}
}
export class LoadDataFail implements Action {
  readonly type: SampleDataActionTypes.LOAD_DATA_FAIL =
    SampleDataActionTypes.LOAD_DATA_FAIL;
  constructor(public payload: { error: Error }) {}
}

export class AddData implements Action {
  readonly type: SampleDataActionTypes.ADD_DATA =
    SampleDataActionTypes.ADD_DATA;
  constructor(public payload: SampledataModel) {}
}
export class AddDataSuccess implements Action {
  readonly type: SampleDataActionTypes.ADD_DATA_SUCCESS =
    SampleDataActionTypes.ADD_DATA_SUCCESS;
  constructor(public payload: SampledataModel) {}
}
export class AddDataFail implements Action {
  readonly type: SampleDataActionTypes.ADD_DATA_FAIL =
    SampleDataActionTypes.ADD_DATA_FAIL;
  constructor(public payload: { error: Error }) {}
}
export class DeleteData implements Action {
  readonly type: SampleDataActionTypes.DELETE_DATA =
    SampleDataActionTypes.DELETE_DATA;
  constructor(public payload: SampledataModel) {}
}
export class DeleteDataSuccess implements Action {
  readonly type: SampleDataActionTypes.DELETE_DATA_SUCCESS =
    SampleDataActionTypes.DELETE_DATA_SUCCESS;
  constructor(public payload: SampledataModel) {}
}
export class EditData implements Action {
  readonly type: SampleDataActionTypes.EDIT_DATA =
    SampleDataActionTypes.EDIT_DATA;
  constructor(public payload: SampledataModel) {}
}
export class EditDataSuccess implements Action {
  readonly type: SampleDataActionTypes.EDIT_DATA_SUCCESS =
    SampleDataActionTypes.EDIT_DATA_SUCCESS;
  constructor(public payload: SampledataModel) {}
}
export class EditDataFail implements Action {
  readonly type: SampleDataActionTypes.EDIT_DATA_FAIL =
    SampleDataActionTypes.EDIT_DATA_FAIL;
  constructor(public payload: { error: Error }) {}
}
export class DeleteDataFail implements Action {
  readonly type: SampleDataActionTypes.DELETE_DATA_FAIL =
    SampleDataActionTypes.DELETE_DATA_FAIL;
  constructor(public payload: { error: Error }) {}
}
export class SearchData implements Action {
  readonly type: SampleDataActionTypes.SEARCH_DATA =
    SampleDataActionTypes.SEARCH_DATA;
  constructor(public payload: SampledataModel) {}
}
export class SearchDataSuccess implements Action {
  readonly type: SampleDataActionTypes.SEARCH_DATA_SUCCESS =
    SampleDataActionTypes.SEARCH_DATA_SUCCESS;
}

export type SampleDataAction =
  | AddData
  | AddDataSuccess
  | AddDataFail
  | DeleteDataSuccess
  | DeleteData
  | DeleteDataFail
  | EditData
  | EditDataSuccess
  | EditDataFail
  | SearchData
  | LoadData
  | LoadDataSuccess
  | LoadDataFail
  | SearchDataSuccess;
