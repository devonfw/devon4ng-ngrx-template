import { createSelector } from '@ngrx/store';
import { getAppState } from '../reducers';
import { AppState } from '../reducers/index';
import * as authenticationState from '../reducers/authentication.reducers';
import * as sampleDataState from '../reducers/sampledata.reducers';
export const getSampleDataState: any = createSelector(
  getAppState,
  (state: AppState) => state.sampledata,
);

export const getSampleDataDetails: any = createSelector(
  getSampleDataState,
  sampleDataState.getSampleDataDetails,
);
export const getDataLoading: any = createSelector(
  getSampleDataState,
  sampleDataState.getDataLoading,
);
export const getDataLoaded: any = createSelector(
  getSampleDataState,
  sampleDataState.getDataLoaded,
);
