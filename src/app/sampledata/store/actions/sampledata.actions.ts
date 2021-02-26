import { Update } from '@ngrx/entity';
import { createAction, props, union } from '@ngrx/store';
import { HttpResponseModel } from '../../models/httpresponse.model';
import { SampleDataModel } from '../../models/sampledata.model';
import { SearchCriteriaDataModel } from '../../models/searchcriteriadata.model';

export const loadData = createAction(
  '[SampleData] LoadData',
  props<{ sampleDataModel: SampleDataModel }>(),
);

export const loadDataSuccess = createAction(
  '[SampleData] LoadDataSuccess',
  props<{ httpResponseModel: HttpResponseModel }>(),
);

export const loadDataFail = createAction(
  '[SampleData] LoadDataFail',
  props<{ error: Error }>(),
);

export const createData = createAction(
  '[SampleData] CreateData',
  props<{ searchCriteriaDataModel: SearchCriteriaDataModel }>(),
);

export const createDataSuccess = createAction(
  '[SampleData] CreateDataSuccess',
  props<{ searchCriteriaDataModel: SearchCriteriaDataModel }>(),
);

export const createDataFail = createAction(
  '[SampleData] CreateDataFail',
  props<{ error: Error }>(),
);

export const deleteData = createAction(
  '[SampleData] DeleteData',
  props<{ searchCriteriaDataModel: SearchCriteriaDataModel }>(),
);

export const deleteDataSuccess = createAction(
  '[SampleData] DeleteSuccess',
  props<{ searchCriteriaDataModel: SearchCriteriaDataModel }>(),
);

export const updateData = createAction(
  '[SampleData] UpdateData',
  props<{ searchCriteriaDataModel: SearchCriteriaDataModel }>(),
);

export const updateDataSuccess = createAction(
  '[SampleData] UpdateDataSuccess',
  props<{ criteria: any; data: Update<SampleDataModel> }>(),
);

export const updateDataFail = createAction(
  '[SampleData] UpdateDataFail',
  props<{ error: Error }>(),
);

export const deleteDataFail = createAction(
  '[SampleData] DeleteDataFail',
  props<{ error: Error }>(),
);

export const searchData = createAction(
  '[SampleData] SearchData',
  props<{ sampleDataModel: SampleDataModel }>(),
);

export const searchDataSuccess = createAction('[SampleData] SearchDataSuccess');

const all = union({
  loadData,
  loadDataSuccess,
  loadDataFail,
  createData,
  createDataSuccess,
  createDataFail,
  deleteData,
  deleteDataSuccess,
  deleteDataFail,
  updateData,
  updateDataSuccess,
  updateDataFail,
  searchData,
  searchDataSuccess,
});

export type SampleDataActions = typeof all;
