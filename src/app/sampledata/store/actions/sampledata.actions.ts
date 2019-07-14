import { Action } from '@ngrx/store';
import { SampleDataModel } from '../../models/sampledata.model';
import { Update } from '@ngrx/entity';
import { HttpResponseModel } from '../../models/httpresponse.model';
import { SearchCriteriaDataModel } from '../../models/searchcriteriadata.model';
export enum SampleDataActionTypes {
  LOAD_DATA = '[SampleData] LoadData ',
  LOAD_DATA_SUCCESS = '[SampleData] LoadDataSuccess ',
  LOAD_DATA_FAIL = '[SampleData] LoadDataFail',
  SEARCH_DATA = '[SampleData] SearchData',
  SEARCH_DATA_SUCCESS = '[SampleData] SearchDataSuccess',
  CREATE_DATA = '[SampleData] CreateData',
  CREATE_DATA_SUCCESS = '[SampleData] CreateDataSuccess',
  CREATE_DATA_FAIL = '[SampleData] CreateDataFail',
  DELETE_DATA = '[SampleData] DeleteData',
  DELETE_DATA_SUCCESS = '[SampleData] DeleteSuccess',
  DELETE_DATA_FAIL = '[SampleData] DeleteDataFail',
  UPDATE_DATA = '[SampleData] UpdateData',
  UPDATE_DATA_FAIL = '[SampleData] UpdateDataFail',
  UPDATE_DATA_SUCCESS = '[SampleData] UpdateDataSuccess',
}
/* @export
 * @class LoadData
 * @implements {Action}
 */
export class LoadData implements Action {
  readonly type: SampleDataActionTypes = SampleDataActionTypes.LOAD_DATA;
  constructor(public payload: SampleDataModel) {}
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
 * @class CreateData
 * @implements {Action}
 */
export class CreateData implements Action {
  readonly type: SampleDataActionTypes = SampleDataActionTypes.CREATE_DATA;
  constructor(public payload: SearchCriteriaDataModel) {}
}

/* @export
 * @class CreateDataSuccess
 * @implements {Action}
 */
export class CreateDataSuccess implements Action {
  readonly type: SampleDataActionTypes =
    SampleDataActionTypes.CREATE_DATA_SUCCESS;
  constructor(public payload: SearchCriteriaDataModel) {}
}

/* @export
 * @class CreateDataFail
 * @implements {Action}
 */
export class CreateDataFail implements Action {
  readonly type: SampleDataActionTypes = SampleDataActionTypes.CREATE_DATA_FAIL;
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
 * @class UpdateData
 * @implements {Action}
 */
export class UpdateData implements Action {
  readonly type: SampleDataActionTypes = SampleDataActionTypes.UPDATE_DATA;
  constructor(public payload: SearchCriteriaDataModel) {}
}

/* @export
 * @class UpdateDataSuccess
 * @implements {Action}
 */
export class UpdateDataSuccess implements Action {
  readonly type: SampleDataActionTypes =
    SampleDataActionTypes.UPDATE_DATA_SUCCESS;
  constructor(
    public payload: { criteria: {}; data: Update<SampleDataModel> },
  ) {}
}

/* @export
 * @class UpdateDataFail
 * @implements {Action}
 */
export class UpdateDataFail implements Action {
  readonly type: SampleDataActionTypes = SampleDataActionTypes.UPDATE_DATA_FAIL;
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
  constructor(public payload: SampleDataModel) {}
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
  | CreateData
  | CreateDataSuccess
  | CreateDataFail
  | DeleteDataSuccess
  | DeleteData
  | DeleteDataFail
  | UpdateData
  | UpdateDataSuccess
  | UpdateDataFail
  | SearchData
  | LoadData
  | LoadDataSuccess
  | LoadDataFail
  | SearchDataSuccess;
