import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SampledataModel } from '../../models/sampledata.model';
import {
  SampleDataActionTypes,
  SampleDataAction,
  LoadDataSuccess,
  AddDataSuccess,
  EditDataSuccess,
} from '../actions/sampledata.actions';

/* @export
 * @interface SampleDataState
 */
export interface SampleDataState extends EntityState<SampledataModel> {
  loaded: boolean;
  loading: boolean;
  textMessage: string;
}

export const adapter: EntityAdapter<SampledataModel> = createEntityAdapter<
  SampledataModel
>();

export const initialState: SampleDataState = adapter.getInitialState({
  loaded: false,
  loading: false,
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
      const data: SampledataModel[] = (<LoadDataSuccess>action).payload;
      state = {
        ...state,
        loading: false,
        loaded: true,
      };
      return adapter.addAll(data, state);
    }

    case SampleDataActionTypes.LOAD_DATA_FAIL: {
      return { ...state, loading: false, loaded: false };
    }

    case SampleDataActionTypes.ADD_DATA: {
      return { ...state };
    }

    case SampleDataActionTypes.ADD_DATA_SUCCESS: {
      const data: SampledataModel = (<AddDataSuccess>action).payload;
      state = {
        ...state,
        loading: false,
        loaded: false,
      };
      return adapter.addOne(data, state);
    }

    case SampleDataActionTypes.ADD_DATA_FAIL: {
      return { ...state, textMessage: 'Add Data Fail' };
    }

    case SampleDataActionTypes.EDIT_DATA: {
      return { ...state };
    }

    case SampleDataActionTypes.EDIT_DATA_SUCCESS: {
      const data: SampledataModel = (<EditDataSuccess>action).payload;
      state = {
        ...state,
        textMessage: 'Edit Data Success',
      };
      return adapter.addOne(data, state);
    }

    case SampleDataActionTypes.EDIT_DATA_FAIL: {
      return { ...state, textMessage: 'Edit Data Fail' };
    }
    case SampleDataActionTypes.DELETE_DATA: {
      return { ...state };
    }
    case SampleDataActionTypes.DELETE_DATA_SUCCESS: {
      return {
        ...state,
        textMessage: 'delete Data Success',
        loading: false,
        loaded: true,
      };
    }
    case SampleDataActionTypes.DELETE_DATA_FAIL: {
      return { ...state, textMessage: 'delete Data Fail' };
    }
    default: {
      return state;
    }
  }
}

export const getSampleDataLoading: any = (state: SampleDataState) =>
  state.loading;
export const getSampleDataLoaded: any = (state: SampleDataState) =>
  state.loaded;
