import { createAction, props, union } from '@ngrx/store';
import { AuthenticateModel } from '../../../auth/models/authentication.model';

export const logInAction = createAction(
  '[AuthActions] Login',
  props<{ authenticateModel: AuthenticateModel }>(),
);

export const logInSuccess = createAction(
  '[AuthActions] LoginSuccess',
  props<{ token: string }>(),
);

export const logInFail = createAction(
  '[AuthActions] LoginFail',
  props<{ error: Error }>(),
);

export const logOutAction = createAction('[AuthActions] Logout');

export const logOutSuccess = createAction('[AuthActions] LogoutSuccess');

export const logOutFail = createAction(
  '[AuthActions] LogoutFail',
  props<{ error: Error }>(),
);

const all = union({
  logInAction,
  logInSuccess,
  logInFail,
  logOutAction,
  logOutSuccess,
  logOutFail,
});

export type AuthActions = typeof all;
