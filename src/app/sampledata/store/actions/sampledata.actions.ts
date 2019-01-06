import { Action } from '@ngrx/store';

export enum SampleDataActionTypes {
  LOGIN = '[LoginAuth] Login ',
  LOGIN_SUCCESS = '[LoginAuth] LoginSuccess',
  LOGIN_FAIL = '[LoginAuth] LoginFail',
  LOGOUT = '[LoginAuth] Logout ',
  LOGOUT_SUCCESS = '[LoginAuth] LogoutSuccess',
  LOGOUT_FAIL = '[LoginAuth] LogoutFail',
  LOAD_DATA = '[LoginAuth] LoadData ',
  LOAD_DATA_SUCCESS = '[LoginAuth] LoadDataSuccess ',
  LOAD_DATA_FAIL = '[LoginAuth] LoadDataFail',
  SEARCH_DATA = '[SearchData] SearchData',
  SEARCH_DATA_SUCCESS = '[SearchData] SearchDataSuccess',
  ADD_DATA = '[AddData] Add',
  ADD_DATA_SUCCESS = '[AddData] AddDataSuccess',
  ADD_DATA_FAIL = '[AddData] AddDataFail',
  DELETE_DATA = '[DeleteData] Delete',
  DELETE_DATA_SUCCESS = '[DeleteData] DeleteSuccess',
  DELETE_DATA_FAIL = '[DeleteData] DeleteDataFail',
  EDIT_DATA = '[EditData] EditData',
  EDIT_DATA_FAIL = '[EditData] EditDataFail',
  EDIT_DATA_SUCCESS = '[EditData] EditDataSuccess',
}

export class LogInAction implements Action {
  readonly type: SampleDataActionTypes.LOGIN = SampleDataActionTypes.LOGIN;
  constructor(public payload: any) {}
}
export class LogInSuccess implements Action {
  readonly type: SampleDataActionTypes.LOGIN_SUCCESS =
    SampleDataActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}
export class LogInFail implements Action {
  readonly type: SampleDataActionTypes.LOGIN_FAIL =
    SampleDataActionTypes.LOGIN_FAIL;
  constructor(public payload: { error: Error }) {}
}
export class LogOutAction implements Action {
  readonly type: SampleDataActionTypes.LOGOUT = SampleDataActionTypes.LOGOUT;
  constructor() {}
}
export class LogOutSuccess implements Action {
  readonly type: SampleDataActionTypes.LOGOUT_SUCCESS =
    SampleDataActionTypes.LOGOUT_SUCCESS;
  constructor() {}
}
export class LogOutFail implements Action {
  readonly type: SampleDataActionTypes.LOGOUT_FAIL =
    SampleDataActionTypes.LOGOUT_FAIL;
  constructor(public payload: { error: Error }) {}
}
export class AddData implements Action {
  readonly type: SampleDataActionTypes.ADD_DATA =
    SampleDataActionTypes.ADD_DATA;
  constructor(public payload: any) {}
}
export class AddDataSuccess implements Action {
  readonly type: SampleDataActionTypes.ADD_DATA_SUCCESS =
    SampleDataActionTypes.ADD_DATA_SUCCESS;
  constructor(public payload: any) {}
}
export class AddDataFail implements Action {
  readonly type: SampleDataActionTypes.ADD_DATA_FAIL =
    SampleDataActionTypes.ADD_DATA_FAIL;
  constructor(public payload: { error: Error }) {}
}
export class DeleteData implements Action {
  readonly type: SampleDataActionTypes.DELETE_DATA =
    SampleDataActionTypes.DELETE_DATA;
  constructor(public payload: any) {}
}
export class DeleteDataSuccess implements Action {
  readonly type: SampleDataActionTypes.DELETE_DATA_SUCCESS =
    SampleDataActionTypes.DELETE_DATA_SUCCESS;
  constructor(public payload: any) {}
}
export class EditData implements Action {
  readonly type: SampleDataActionTypes.EDIT_DATA =
    SampleDataActionTypes.EDIT_DATA;
  constructor(public payload: any) {}
}
export class EditDataSuccess implements Action {
  readonly type: SampleDataActionTypes.EDIT_DATA_SUCCESS =
    SampleDataActionTypes.EDIT_DATA_SUCCESS;
  constructor(public payload: any) {}
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
  constructor(public payload: any) {}
}
export class SearchDataSuccess implements Action {
  readonly type: SampleDataActionTypes.SEARCH_DATA_SUCCESS =
    SampleDataActionTypes.SEARCH_DATA_SUCCESS;
  constructor(public payload: any) {}
}
export class LoadDataSuccess implements Action {
  readonly type: SampleDataActionTypes.LOAD_DATA_SUCCESS =
    SampleDataActionTypes.LOAD_DATA_SUCCESS;
  constructor() {}
}
export class LoadDataFail implements Action {
  readonly type: SampleDataActionTypes.LOAD_DATA_FAIL =
    SampleDataActionTypes.LOAD_DATA_FAIL;
  constructor(public payload: any) {}
}
export class LoadData implements Action {
  readonly type: SampleDataActionTypes.LOAD_DATA =
    SampleDataActionTypes.LOAD_DATA;
  constructor() {}
}
export type All =
  | LogInAction
  | LogInSuccess
  | LogInFail
  | LogOutAction
  | LogOutSuccess
  | LogOutFail
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
  | SearchDataSuccess
  | LoadDataSuccess
  | LoadData;
