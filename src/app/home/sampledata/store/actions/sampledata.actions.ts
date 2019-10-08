import { Action, createAction } from '@ngrx/store';
import { SampleDataModel } from '../../models/sampledata.model';
import { Update } from '@ngrx/entity';
import { HttpResponseModel } from '../../models/httpresponse.model';
import { SearchCriteriaDataModel } from '../../models/searchcriteriadata.model';
import {
  FunctionWithParametersType,
  TypedAction,
  ActionCreator,
} from '@ngrx/store/src/models';
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
export const loadData: FunctionWithParametersType<
  [SampleDataModel],
  {
    payload: SampleDataModel;
  } & TypedAction<SampleDataActionTypes.LOAD_DATA>
> &
  TypedAction<SampleDataActionTypes.LOAD_DATA> = createAction(
  SampleDataActionTypes.LOAD_DATA,
  (payload: SampleDataModel) => ({ payload }),
);

/* @export
 * @class LoadDataSuccess
 * @implements {Action}
 */
export const loadDataSuccess: FunctionWithParametersType<
  [HttpResponseModel],
  {
    payload: HttpResponseModel;
  } & TypedAction<SampleDataActionTypes.LOAD_DATA_SUCCESS>
> &
  TypedAction<SampleDataActionTypes.LOAD_DATA_SUCCESS> = createAction(
  SampleDataActionTypes.LOAD_DATA_SUCCESS,
  (payload: HttpResponseModel) => ({ payload }),
);

/* @export
 * @class LoadDataFail
 * @implements {Action}
 */
export const loadDataFail: FunctionWithParametersType<
  [
    {
      error: Error;
    },
  ],
  {
    payload: {
      error: Error;
    };
  } & TypedAction<SampleDataActionTypes.LOAD_DATA_FAIL>
> &
  TypedAction<SampleDataActionTypes.LOAD_DATA_FAIL> = createAction(
  SampleDataActionTypes.LOAD_DATA_FAIL,
  (payload: { error: Error }) => ({ payload }),
);

/* @export
 * @class CreateData
 * @implements {Action}
 */
export const createData: FunctionWithParametersType<
  [SearchCriteriaDataModel],
  {
    payload: SearchCriteriaDataModel;
  } & TypedAction<SampleDataActionTypes.CREATE_DATA>
> &
  TypedAction<SampleDataActionTypes.CREATE_DATA> = createAction(
  SampleDataActionTypes.CREATE_DATA,
  (payload: SearchCriteriaDataModel) => ({ payload }),
);

export const createDataSuccess: FunctionWithParametersType<
  [SearchCriteriaDataModel],
  {
    payload: SearchCriteriaDataModel;
  } & TypedAction<SampleDataActionTypes.CREATE_DATA_SUCCESS>
> &
  TypedAction<SampleDataActionTypes.CREATE_DATA_SUCCESS> = createAction(
  SampleDataActionTypes.CREATE_DATA_SUCCESS,
  (payload: SearchCriteriaDataModel) => ({ payload }),
);

/* @export
 * @class CreateDataFail
 * @implements {Action}
 */
export const createDataFail: FunctionWithParametersType<
  [
    {
      error: Error;
    },
  ],
  {
    payload: {
      error: Error;
    };
  } & TypedAction<SampleDataActionTypes.CREATE_DATA_FAIL>
> &
  TypedAction<SampleDataActionTypes.CREATE_DATA_FAIL> = createAction(
  SampleDataActionTypes.CREATE_DATA_FAIL,
  (payload: { error: Error }) => ({ payload }),
);

/* @export
 * @class DeleteData
 * @implements {Action}
 */
export const deleteData: FunctionWithParametersType<
  [SearchCriteriaDataModel],
  {
    payload: SearchCriteriaDataModel;
  } & TypedAction<SampleDataActionTypes.DELETE_DATA>
> &
  TypedAction<SampleDataActionTypes.DELETE_DATA> = createAction(
  SampleDataActionTypes.DELETE_DATA,
  (payload: SearchCriteriaDataModel) => ({ payload }),
);

/* @export
 * @class DeleteDataSuccess
 * @implements {Action}
 */
export const deleteDataSuccess: FunctionWithParametersType<
  [SearchCriteriaDataModel],
  {
    payload: SearchCriteriaDataModel;
  } & TypedAction<SampleDataActionTypes.DELETE_DATA_SUCCESS>
> &
  TypedAction<SampleDataActionTypes.DELETE_DATA_SUCCESS> = createAction(
  SampleDataActionTypes.DELETE_DATA_SUCCESS,
  (payload: SearchCriteriaDataModel) => ({ payload }),
);

/* @export
 * @class UpdateData
 * @implements {Action}
 */
export const updateData: FunctionWithParametersType<
  [SearchCriteriaDataModel],
  {
    payload: SearchCriteriaDataModel;
  } & TypedAction<SampleDataActionTypes.UPDATE_DATA>
> &
  TypedAction<SampleDataActionTypes.UPDATE_DATA> = createAction(
  SampleDataActionTypes.UPDATE_DATA,
  (payload: SearchCriteriaDataModel) => ({ payload }),
);

/* @export
 * @class UpdateDataSuccess
 * @implements {Action}
 */
export const updateDataSuccess = createAction(
  SampleDataActionTypes.UPDATE_DATA_SUCCESS,
  (payload: { criteria: {}; data: Update<SampleDataModel> }) => ({ payload }),
);

/* @export
 * @class UpdateDataFail
 * @implements {Action}
 */
export const updateDataFail: FunctionWithParametersType<
  [
    {
      error: Error;
    },
  ],
  {
    payload: {
      error: Error;
    };
  } & TypedAction<SampleDataActionTypes.UPDATE_DATA_FAIL>
> &
  TypedAction<SampleDataActionTypes.UPDATE_DATA_FAIL> = createAction(
  SampleDataActionTypes.UPDATE_DATA_FAIL,
  (payload: { error: Error }) => ({ payload }),
);

/* @export
 * @class DeleteDataFail
 * @implements {Action}
 */
export const deleteDataFail: FunctionWithParametersType<
  [
    {
      error: Error;
    },
  ],
  {
    payload: {
      error: Error;
    };
  } & TypedAction<SampleDataActionTypes.DELETE_DATA_FAIL>
> &
  TypedAction<SampleDataActionTypes.DELETE_DATA_FAIL> = createAction(
  SampleDataActionTypes.DELETE_DATA_FAIL,
  (payload: { error: Error }) => ({ payload }),
);

/* @export
 * @class SearchData
 * @implements {Action}
 */
export const searchData: FunctionWithParametersType<
  [SampleDataModel],
  {
    payload: SampleDataModel;
  } & TypedAction<SampleDataActionTypes.SEARCH_DATA>
> &
  TypedAction<SampleDataActionTypes.SEARCH_DATA> = createAction(
  SampleDataActionTypes.SEARCH_DATA,
  (payload: SampleDataModel) => ({ payload }),
);

/* @export
 * @class SearchDataSuccess
 * @implements {Action}
 */
export const searchDataSuccess: ActionCreator<
  SampleDataActionTypes.SEARCH_DATA_SUCCESS,
  () => TypedAction<SampleDataActionTypes.SEARCH_DATA_SUCCESS>
> = createAction(SampleDataActionTypes.SEARCH_DATA_SUCCESS);
