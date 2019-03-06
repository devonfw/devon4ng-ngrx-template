import { createSelector } from '@ngrx/store';
import { getAppState } from '../reducers';
import { AppState } from '../reducers/index';
import * as sampleDataState from '../reducers/sampledata.reducers';
export const getSampleDataState: any = createSelector(
  getAppState,
  (state: AppState) => state.sampleData,
);
export const getSampleDataDetails: any = createSelector(
  getSampleDataState,
  sampleDataState.getSampleData,
);
export const getDataLoading: any = createSelector(
  getSampleDataState,
  sampleDataState.getSampleDataLoading,
);
export const getDataLoaded: any = createSelector(
  getSampleDataState,
  sampleDataState.getSampleDataLoaded,
);
