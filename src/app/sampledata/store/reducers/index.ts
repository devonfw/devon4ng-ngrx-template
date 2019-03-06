import * as sampleDataState from './sampledata.reducers';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export * from '../effects';
/* @export
 * @interface AppState
 */
export interface AppState {
  sampleData: sampleDataState.SampleDataState;
}
export const reducers: ActionReducerMap<AppState> = {
  sampleData: sampleDataState.reducer,
};

export const getAppState: any = createFeatureSelector<AppState>(
  'sampledatareducer',
);
