import { SampledataModel } from '../../models/sampledata.model';
import {
  SampleDataActionTypes,
  SampleDataAction,
} from '../actions/sampledata.actions';

/* @export
 * @interface SampleDataState
 */
export interface SampleDataState {
  sampleData: SampledataModel[];
  loaded: boolean;
  loading: boolean;
  textMessage: string;
}
export const initialState: SampleDataState = {
  sampleData: [],
  loaded: false,
  loading: false,
  textMessage: undefined,
};

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
      return {
        ...state,
        sampleData: action.payload,
        loading: false,
        loaded: true,
      };
    }
    case SampleDataActionTypes.LOAD_DATA_FAIL: {
      return { ...state, loading: false, loaded: false };
    }
    case SampleDataActionTypes.ADD_DATA: {
      return { ...state };
    }
    case SampleDataActionTypes.ADD_DATA_SUCCESS: {
      const data: any = action.payload;
      return {
        ...state,
        sampleData: data,
        loading: false,
        loaded: false,
      };
    }
    case SampleDataActionTypes.ADD_DATA_FAIL: {
      return { ...state, textMessage: 'Add Data Fail' };
    }
    case SampleDataActionTypes.EDIT_DATA: {
      return { ...state };
    }
    case SampleDataActionTypes.EDIT_DATA_SUCCESS: {
      const data: any = action.payload;
      return {
        ...state,
        sampleData: data,
        textMessage: 'Edit Data Success',
      };
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
export const getSampleData: any = (state: SampleDataState) => state.sampleData;
export const getSampleDataLoading: any = (state: SampleDataState) =>
  state.loading;
export const getSampleDataLoaded: any = (state: SampleDataState) =>
  state.loaded;
