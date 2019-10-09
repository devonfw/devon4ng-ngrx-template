import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { HttpResponseModel } from '../../models/httpresponse.model';
import { SampleDataModel } from '../../models/sampledata.model';
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
export const loadData = createAction(
  SampleDataActionTypes.LOAD_DATA,
  props<{ sampleDataModel: SampleDataModel }>(),
);

/* @export
 * @class LoadDataSuccess
 * @implements {Action}
 */
export const loadDataSuccess = createAction(
  SampleDataActionTypes.LOAD_DATA_SUCCESS,
  props<{ httpResponseModel: HttpResponseModel }>(),
);

/* @export
 * @class LoadDataFail
 * @implements {Action}
 */
export const loadDataFail = createAction(
  SampleDataActionTypes.LOAD_DATA_FAIL,
  props<{ error: Error }>(),
);

/* @export
 * @class CreateData
 * @implements {Action}
 */
export const createData = createAction(
  SampleDataActionTypes.CREATE_DATA,
  props<{ searchCriteriaDataModel: SearchCriteriaDataModel }>(),
);

export const createDataSuccess = createAction(
  SampleDataActionTypes.CREATE_DATA_SUCCESS,
  props<{ searchCriteriaDataModel: SearchCriteriaDataModel }>(),
);

/* @export
 * @class CreateDataFail
 * @implements {Action}
 */
export const createDataFail = createAction(
  SampleDataActionTypes.CREATE_DATA_FAIL,
  props<{ error: Error }>(),
);

/* @export
 * @class DeleteData
 * @implements {Action}
 */
export const deleteData = createAction(
  SampleDataActionTypes.DELETE_DATA,
  props<{ searchCriteriaDataModel: SearchCriteriaDataModel }>(),
);

/* @export
 * @class DeleteDataSuccess
 * @implements {Action}
 */
export const deleteDataSuccess = createAction(
  SampleDataActionTypes.DELETE_DATA_SUCCESS,
  props<{ searchCriteriaDataModel: SearchCriteriaDataModel }>(),
);

/* @export
 * @class UpdateData
 * @implements {Action}
 */
export const updateData = createAction(
  SampleDataActionTypes.UPDATE_DATA,
  props<{ searchCriteriaDataModel: SearchCriteriaDataModel }>(),
);

/* @export
 * @class UpdateDataSuccess
 * @implements {Action}
 */
export const updateDataSuccess = createAction(
  SampleDataActionTypes.UPDATE_DATA_SUCCESS,
  props<{ criteria: {}; data: Update<SampleDataModel> }>(),
);

/* @export
 * @class UpdateDataFail
 * @implements {Action}
 */
export const updateDataFail = createAction(
  SampleDataActionTypes.UPDATE_DATA_FAIL,
  props<{ error: Error }>(),
);

/* @export
 * @class DeleteDataFail
 * @implements {Action}
 */
export const deleteDataFail = createAction(
  SampleDataActionTypes.DELETE_DATA_FAIL,
  props<{ error: Error }>(),
);

/* @export
 * @class SearchData
 * @implements {Action}
 */
export const searchData = createAction(
  SampleDataActionTypes.SEARCH_DATA,
  props<{ sampleDataModel: SampleDataModel }>(),
);

/* @export
 * @class SearchDataSuccess
 * @implements {Action}
 */
export const searchDataSuccess = createAction(
  SampleDataActionTypes.SEARCH_DATA_SUCCESS,
);
