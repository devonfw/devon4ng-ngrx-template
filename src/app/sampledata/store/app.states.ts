import * as oasptemplate from './reducers/oasp-template.reducers';
import { ActionReducerMap } from '@ngrx/store';
import { createFeatureSelector,createSelector } from '@ngrx/store';
import { reducer, sampledataAdapter } from './reducers/oasp-template.reducers';
//import * as fromRoot from '@app-root-store';
export interface AppState {
    loginState: oasptemplate.State,
   
  }

  export const reducers = {
    auth: oasptemplate.reducer
  };

  
  
  export const selectAuthState = createFeatureSelector<AppState>('auth');

  export const getContactsState = createSelector(
    selectAuthState,
    state => state.loginState
);
debugger
console.log('a1')
export const { selectAll: getAllContacts,selectEntities: getContactEntities} = oasptemplate.sampledataAdapter.getSelectors(getContactsState);
console.log('a2')