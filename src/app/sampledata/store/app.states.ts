import * as sampledatatemplate from './reducers/sampledata.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export * from './effects';
export interface AppState {
  loginState: sampledatatemplate.State;
}
export const reducers: any = {
  auth: sampledatatemplate.reducer,
};
export const selectAuthState: any = createFeatureSelector<AppState>('auth');
export const getContactsState: any = createSelector(
  selectAuthState,
  (state: any) => state.loginState,
);
export const {
  selectAll: getAllContacts,
  selectEntities: getContactEntities,
} = sampledatatemplate.sampledataAdapter.getSelectors(getContactsState);
