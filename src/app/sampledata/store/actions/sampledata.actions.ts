import { Action } from '@ngrx/store';
import { SampledataModel } from '../../models/sampledata.model';
import { Update } from '@ngrx/entity';
import { HttpResponseModel } from '../../models/httpresponse.model';
import { SearchCriteriaDataModel } from '../../models/searchcriteriadata.model';
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
/* @export
 * @class LoadData
 * @implements {Action}
 */
export class LoadData implements Action {
  readonly type: SampleDataActionTypes = SampleDataActionTypes.LOAD_DATA;
  constructor(public payload: SampledataModel) {}
}

/* @export
 * @class LoadDataSuccess
 * @implements {Action}
 */
export class LoadDataSuccess implements Action {
  readonly type: SampleDataActionTypes =
    SampleDataActionTypes.LOAD_DATA_SUCCESS;
  constructor(public payload: HttpResponseModel) {}
}

/* @export
 * @class LoadDataFail
 * @implements {Action}
 */
export class LoadDataFail implements Action {
  readonly type: SampleDataActionTypes = SampleDataActionTypes.LOAD_DATA_FAIL;
  constructor(public payload: { error: Error }) {}
}

/* @export
 * @class AddData
 * @implements {Action}
 */
export class AddData implements Action {
  readonly type: SampleDataActionTypes = SampleDataActionTypes.ADD_DATA;
  constructor(public payload: SearchCriteriaDataModel) {}
}

/* @export
 * @class AddDataSuccess
 * @implements {Action}
 */
export class AddDataSuccess implements Action {
  readonly type: SampleDataActionTypes = SampleDataActionTypes.ADD_DATA_SUCCESS;
  constructor(public payload: SearchCriteriaDataModel) {}
}

/* @export
 * @class AddDataFail
 * @implements {Action}
 */
export class AddDataFail implements Action {
  readonly type: SampleDataActionTypes = SampleDataActionTypes.ADD_DATA_FAIL;
  constructor(public payload: { error: Error }) {}
}

/* @export
 * @class DeleteData
 * @implements {Action}
 */
export class DeleteData implements Action {
  readonly type: SampleDataActionTypes = SampleDataActionTypes.DELETE_DATA;
  constructor(public payload: SearchCriteriaDataModel) {}
}

/* @export
 * @class DeleteDataSuccess
 * @implements {Action}
 */
export class DeleteDataSuccess implements Action {
  readonly type: SampleDataActionTypes =
    SampleDataActionTypes.DELETE_DATA_SUCCESS;
  constructor(public payload: SearchCriteriaDataModel) {}
}

/* @export
 * @class EditData
 * @implements {Action}
 */
export class EditData implements Action {
  readonly type: SampleDataActionTypes = SampleDataActionTypes.EDIT_DATA;
  constructor(public payload: SearchCriteriaDataModel) {}
}

/* @export
 * @class EditDataSuccess
 * @implements {Action}
 */
export class EditDataSuccess implements Action {
  readonly type: SampleDataActionTypes =
    SampleDataActionTypes.EDIT_DATA_SUCCESS;
  constructor(
    public payload: { criteria: {}; data: Update<SampledataModel> },
  ) {}
}

/* @export
 * @class EditDataFail
 * @implements {Action}
 */
export class EditDataFail implements Action {
  readonly type: SampleDataActionTypes = SampleDataActionTypes.EDIT_DATA_FAIL;
  constructor(public payload: { error: Error }) {}
}

/* @export
 * @class DeleteDataFail
 * @implements {Action}
 */
export class DeleteDataFail implements Action {
  readonly type: SampleDataActionTypes = SampleDataActionTypes.DELETE_DATA_FAIL;
  constructor(public payload: { error: Error }) {}
}

/* @export
 * @class SearchData
 * @implements {Action}
 */
export class SearchData implements Action {
  readonly type: SampleDataActionTypes = SampleDataActionTypes.SEARCH_DATA;
  constructor(public payload: SampledataModel) {}
}

/* @export
 * @class SearchDataSuccess
 * @implements {Action}
 */
export class SearchDataSuccess implements Action {
  readonly type: SampleDataActionTypes =
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
