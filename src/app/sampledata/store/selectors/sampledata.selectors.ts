import { createSelector } from '@ngrx/store';
import { getAppState } from '../reducers';
import { AppState } from '../reducers/index';
import * as fromSampleData from '../reducers/sampledata.reducers';

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = fromSampleData.adapter.getSelectors();

export const getSampleDataState: any = createSelector(
  getAppState,
  (state: AppState) => state.sampleData,
);

export const getSampleDataArray: any = createSelector(
  getSampleDataState,
  selectAll,
);

export const getSampleDataTotal: any = createSelector(
  getSampleDataState,
  fromSampleData.getSampleDataTotal,
);

export const getDataLoading: any = createSelector(
  getSampleDataState,
  fromSampleData.getSampleDataLoading,
);

export const getDataLoaded: any = createSelector(
  getSampleDataState,
  fromSampleData.getSampleDataLoaded,
);
