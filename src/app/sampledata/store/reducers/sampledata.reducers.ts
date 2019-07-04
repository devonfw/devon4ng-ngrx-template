import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity';
import { SampleDataModel } from '../../models/sampledata.model';
import { HttpResponseModel } from '../../models/httpresponse.model';
import {
  SampleDataActionTypes,
  SampleDataAction,
  LoadDataSuccess,
  CreateDataSuccess,
  UpdateDataSuccess,
  DeleteDataSuccess,
} from '../actions/sampledata.actions';

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

/* @export
 * @param {SampleDataState} [state=initialState]
 * @param {SampleDataAction} action
 * @returns {SampleDataState}
 */
export function reducer(
  state: SampleDataState = initialState,
  action: SampleDataAction,
): SampleDataState {
  switch (action.type) {
    case SampleDataActionTypes.LOAD_DATA: {
      return { ...state, loading: true };
    }

    case SampleDataActionTypes.LOAD_DATA_SUCCESS: {
      const response: HttpResponseModel = (<LoadDataSuccess>action).payload;
      const data: SampleDataModel[] = response.content;

      state = {
        ...state,
        loading: false,
        loaded: true,
        totalElements: response.totalElements,
      };
      return adapter.addAll(data, state);
    }

    case SampleDataActionTypes.LOAD_DATA_FAIL: {
      return { ...state, loading: false, loaded: false };
    }

    case SampleDataActionTypes.CREATE_DATA: {
      return { ...state };
    }

    case SampleDataActionTypes.CREATE_DATA_SUCCESS: {
      const data: SampleDataModel = (<CreateDataSuccess>action).payload.data;
      state = {
        ...state,
        loading: false,
        loaded: false,
      };
      return adapter.addOne(data, state);
    }

    case SampleDataActionTypes.CREATE_DATA_FAIL: {
      return { ...state, textMessage: 'Add Data Fail' };
    }

    case SampleDataActionTypes.UPDATE_DATA: {
      return { ...state };
    }

    case SampleDataActionTypes.UPDATE_DATA_SUCCESS: {
      const data: Update<SampleDataModel> = (<UpdateDataSuccess>action).payload
        .data;
      state = {
        ...state,
        textMessage: 'Edit Data Success',
      };
      return adapter.updateOne(data, state);
    }

    case SampleDataActionTypes.UPDATE_DATA_FAIL: {
      return { ...state, textMessage: 'Edit Data Fail' };
    }
    case SampleDataActionTypes.DELETE_DATA: {
      return { ...state };
    }
    case SampleDataActionTypes.DELETE_DATA_SUCCESS: {
      const dataId: number = (<DeleteDataSuccess>action).payload.data.id;
      state = {
        ...state,
        textMessage: 'delete Data Success',
        loading: false,
        loaded: true,
      };

      return adapter.removeOne(dataId, state);
    }
    case SampleDataActionTypes.DELETE_DATA_FAIL: {
      return { ...state, textMessage: 'delete Data Fail' };
    }
    default: {
      return state;
    }
  }
}

export const getSampleDataTotal: any = (state: SampleDataState) =>
  state.totalElements;
export const getSampleDataLoading: any = (state: SampleDataState) =>
  state.loading;
export const getSampleDataLoaded: any = (state: SampleDataState) =>
  state.loaded;
