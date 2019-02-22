import { createSelector } from '@ngrx/store';
import { getAppState } from '../reducers';
import { AppState } from '../reducers/index';
import * as authenticationState from '../reducers/authentication.reducers';
export const getAuthentication: any = createSelector(
  getAppState,
  (state: AppState) => state.loginState,
);

export const getselectUser: any = createSelector(
  getAuthentication,
  authenticationState.getselectUser,
);
export const getselectError: any = createSelector(
  getAuthentication,
  authenticationState.getselectError,
);
export const gettextMassege: any = createSelector(
  getAuthentication,
  authenticationState.gettextMassege,
);
