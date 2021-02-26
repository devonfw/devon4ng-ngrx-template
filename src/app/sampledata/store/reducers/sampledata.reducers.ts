import {
  createEntityAdapter,
  Dictionary,
  EntityAdapter,
  EntityState,
  Update,
} from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Action, ActionReducer } from '@ngrx/store/src/models';
import { HttpResponseModel } from '../../models/httpresponse.model';
import { SampleDataModel } from '../../models/sampledata.model';
import * as sampleDataActions from '../actions/sampledata.actions';

/* @export
 * @interface SampleDataState
 */
export interface SampleDataState extends EntityState<SampleDataModel> {
  loaded: boolean;
  loading: boolean;
  totalElements: number;
  textMessage: string;
}

export const adapter: EntityAdapter<SampleDataModel> = createEntityAdapter<SampleDataModel>();

export const initialState: SampleDataState = adapter.getInitialState({
  loaded: false,
  loading: false,
  totalElements: 0,
  textMessage: undefined,
});

const sampleDataReducer: ActionReducer<
  {
    textMessage: string;
    loaded: boolean;
    loading: boolean;
    totalElements: number;
    ids: string[] | number[];
    entities: Dictionary<SampleDataModel>;
  },
  Action
> = createReducer(
  initialState,
  on(sampleDataActions.loadData, (state: SampleDataState) => ({
    ...state,
    loading: true,
  })),
  on(sampleDataActions.loadDataSuccess, (state: SampleDataState, action) => {
    const response: HttpResponseModel = action.httpResponseModel;
    const data: SampleDataModel[] = response.content;

    state = {
      ...state,
      loading: false,
      loaded: true,
      totalElements: response.totalElements,
    };
    return adapter.setAll(data, state);
  }),
  on(sampleDataActions.loadDataFail, (state: SampleDataState) => ({
    ...state,
    loading: false,
    loaded: false,
  })),
  on(sampleDataActions.createData, (state: SampleDataState) => ({ ...state })),
  on(sampleDataActions.createDataSuccess, (state: SampleDataState, action) => {
    const data: SampleDataModel = action.searchCriteriaDataModel.data;
    state = {
      ...state,
      loading: false,
      loaded: false,
    };
    return adapter.addOne(data, state);
  }),
  on(sampleDataActions.createDataFail, (state: SampleDataState) => ({
    ...state,
    textMessage: 'Add Data Fail',
  })),
  on(sampleDataActions.updateData, (state: SampleDataState) => ({ ...state })),
  on(sampleDataActions.updateDataSuccess, (state: SampleDataState, action) => {
    const data: Update<SampleDataModel> = action.data;
    state = {
      ...state,
      textMessage: 'Edit Data Success',
    };
    return adapter.updateOne(data, state);
  }),
  on(sampleDataActions.updateDataFail, (state: SampleDataState) => ({
    ...state,
    textMessage: 'Edit Data Fail',
  })),
  on(sampleDataActions.deleteData, (state: SampleDataState) => ({ ...state })),
  on(sampleDataActions.deleteDataSuccess, (state: SampleDataState, action) => {
    const dataId: number = action.searchCriteriaDataModel.data.id;
    state = {
      ...state,
      textMessage: 'delete Data Success',
      loading: false,
      loaded: true,
    };

    return adapter.removeOne(dataId, state);
  }),
  on(sampleDataActions.deleteDataFail, (state: SampleDataState) => ({
    ...state,
    textMessage: 'delete Data Fail',
  })),
);

/**
 * export sampleDataReducer as reducer
 *
 * @param state {SampleDataState}
 * @param action {Action}
 */
export const reducer = (
  state: SampleDataState = initialState,
  action: Action,
): SampleDataState => sampleDataReducer(state, action);

export const getSampleDataTotal: any = (state: SampleDataState) =>
  state.totalElements;
export const getSampleDataLoading: any = (state: SampleDataState) =>
  state.loading;
export const getSampleDataLoaded: any = (state: SampleDataState) =>
  state.loaded;
