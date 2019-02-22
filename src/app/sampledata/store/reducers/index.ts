import * as authenticationState from './authentication.reducers';
import * as sampleDataState from './sampledata.reducers';
import {
  createFeatureSelector,
  createSelector,
  ActionReducerMap,
} from '@ngrx/store';
import { AuthenticateModel } from '../../models/authentication.model';
import { SampleDataState } from './sampledata.reducers';

export * from '../effects';
export interface AppState {
  loginState: authenticationState.AuthState;
  sampledata: sampleDataState.SampleDataState;
}
export const reducers: ActionReducerMap<AppState> = {
  loginState: authenticationState.reducer,
  sampledata: sampleDataState.reducer,
};

export const getAppState: any = createFeatureSelector<AppState>(
  'sampledatareducer',
);

// export const getAllPizzas: any = createSelector(
//   getAppState,
//   (entities: any) => {
//     return entities.sampledata;
//   },
// );

// export const selectAuthState: any = createFeatureSelector<AppState>(
//   'sampledatareducer',
// );

// export const selectAuthUser: any = createSelector(
//   selectAuthState,
//   authenticationState.selectUser,
// );
// export const selectIsLoggedIn: any = createSelector(
//   selectAuthUser,
//   (user: AuthenticateModel) => !!user,
// );
