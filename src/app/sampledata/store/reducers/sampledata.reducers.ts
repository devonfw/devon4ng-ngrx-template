import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
  Dictionary,
} from '@ngrx/entity';
import { SampleDataModel } from '../../models/sampledata.model';
import { HttpResponseModel } from '../../models/httpresponse.model';
import * as sampleDataActions from '../actions/sampledata.actions';
import { createReducer, on } from '@ngrx/store';
import { SearchCriteriaDataModel } from '../../models/searchcriteriadata.model';
import { TypedAction, Action, ActionReducer } from '@ngrx/store/src/models';

/* @export
 * @interface SampleDataState
 */
export interface SampleDataState extends EntityState<SampleDataModel> {
  loaded: boolean;
  loading: boolean;
  totalElements: number;
  textMessage: string;
}

export const adapter: EntityAdapter<SampleDataModel> = createEntityAdapter<
  SampleDataModel
>();

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
  on(
    sampleDataActions.loadDataSuccess,
    (
      state: SampleDataState,
      action: {
        payload: HttpResponseModel;
      } & TypedAction<
        sampleDataActions.SampleDataActionTypes.LOAD_DATA_SUCCESS
      > & {
          type: sampleDataActions.SampleDataActionTypes.LOAD_DATA_SUCCESS;
        },
    ) => {
      const response: HttpResponseModel = action.payload;
      const data: SampleDataModel[] = response.content;

      state = {
        ...state,
        loading: false,
        loaded: true,
        totalElements: response.totalElements,
      };
      return adapter.addAll(data, state);
    },
  ),
  on(sampleDataActions.loadDataFail, (state: SampleDataState) => ({
    ...state,
    loading: false,
    loaded: false,
  })),
  on(sampleDataActions.createData, (state: SampleDataState) => ({ ...state })),
  on(
    sampleDataActions.createDataSuccess,
    (
      state: SampleDataState,
      action: {
        payload: SearchCriteriaDataModel;
      } & TypedAction<
        sampleDataActions.SampleDataActionTypes.CREATE_DATA_SUCCESS
      > & {
          type: sampleDataActions.SampleDataActionTypes.CREATE_DATA_SUCCESS;
        },
    ) => {
      const data: SampleDataModel = action.payload.data;
      state = {
        ...state,
        loading: false,
        loaded: false,
      };
      return adapter.addOne(data, state);
    },
  ),
  on(sampleDataActions.createDataFail, (state: SampleDataState) => ({
    ...state,
    textMessage: 'Add Data Fail',
  })),
  on(sampleDataActions.updateData, (state: SampleDataState) => ({ ...state })),
  on(
    sampleDataActions.updateDataSuccess,
    (
      state: SampleDataState,
      action: {
        payload: {
          criteria: {};
          data: Update<SampleDataModel>;
        };
      } & TypedAction<
        sampleDataActions.SampleDataActionTypes.UPDATE_DATA_SUCCESS
      > & {
          type: sampleDataActions.SampleDataActionTypes.UPDATE_DATA_SUCCESS;
        },
    ) => {
      const data: Update<SampleDataModel> = action.payload.data;
      state = {
        ...state,
        textMessage: 'Edit Data Success',
      };
      return adapter.updateOne(data, state);
    },
  ),
  on(sampleDataActions.updateDataFail, (state: SampleDataState) => ({
    ...state,
    textMessage: 'Edit Data Fail',
  })),
  on(sampleDataActions.deleteData, (state: SampleDataState) => ({ ...state })),
  on(
    sampleDataActions.deleteDataSuccess,
    (
      state: SampleDataState,
      action: {
        payload: SearchCriteriaDataModel;
      } & TypedAction<
        sampleDataActions.SampleDataActionTypes.DELETE_DATA_SUCCESS
      > & {
          type: sampleDataActions.SampleDataActionTypes.DELETE_DATA_SUCCESS;
        },
    ) => {
      const dataId: number = action.payload.data.id;
      state = {
        ...state,
        textMessage: 'delete Data Success',
        loading: false,
        loaded: true,
      };

      return adapter.removeOne(dataId, state);
    },
  ),
  on(sampleDataActions.deleteDataFail, (state: SampleDataState) => ({
    ...state,
    textMessage: 'delete Data Fail',
  })),
);

/* @export
 * @param {SampleDataState} [state=initialState]
 * @param {SampleDataAction} action
 * @returns {SampleDataState}
 */
export function reducer(
  state: SampleDataState = initialState,
  action: Action,
): SampleDataState {
  return sampleDataReducer(state, action);
}

export const getSampleDataTotal: any = (state: SampleDataState) =>
  state.totalElements;
export const getSampleDataLoading: any = (state: SampleDataState) =>
  state.loading;
export const getSampleDataLoaded: any = (state: SampleDataState) =>
  state.loaded;
