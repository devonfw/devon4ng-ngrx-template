import { SampledataModel } from '../../models/sampledata.model';

import { SampleDataActionTypes, All } from '../actions/sampledata.actions';

export interface SampleDataState {
  sampledata: SampledataModel[];
  loaded: boolean;
  loading: boolean;
  textmassege: string;
}

export const initialState: SampleDataState = {
  sampledata: [],
  loaded: false,
  loading: false,
  textmassege: undefined,
};
export function reducer(
  state: SampleDataState = initialState,
  action: All,
): SampleDataState {
  switch (action.type) {
    case SampleDataActionTypes.LOAD_DATA: {
      return { ...state, loading: true };
    }
    case SampleDataActionTypes.LOAD_DATA_SUCCESS: {
      return {
        ...state,
        sampledata: action.payload,
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
        sampledata: data,
        loading: false,
        loaded: false,
      };
    }
    case SampleDataActionTypes.ADD_DATA_FAIL: {
      return { ...state, textmassege: 'Add Data Fail' };
    }
    case SampleDataActionTypes.EDIT_DATA: {
      return { ...state };
    }
    case SampleDataActionTypes.EDIT_DATA_SUCCESS: {
      const data: any = action.payload;
      return {
        ...state,
        sampledata: data,
        textmassege: 'Edit Data Success',
      };
    }
    case SampleDataActionTypes.EDIT_DATA_FAIL: {
      return { ...state, textmassege: 'Edit Data Fail' };
    }
    case SampleDataActionTypes.DELETE_DATA: {
      return { ...state };
    }
    case SampleDataActionTypes.DELETE_DATA_SUCCESS: {
      return {
        ...state,
        textmassege: 'delete Data Success',
        loading: false,
        loaded: true,
      };
    }
    case SampleDataActionTypes.DELETE_DATA_FAIL: {
      return { ...state, textmassege: 'delete Data Fail' };
    }
    default: {
      return state;
    }
  }
}
export const getSampleDataDetails: any = (state: SampleDataState) =>
  state.sampledata;
export const getDataLoading: any = (state: SampleDataState) => state.loading;
export const getDataLoaded: any = (state: SampleDataState) => state.loaded;
