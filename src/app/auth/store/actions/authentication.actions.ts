import { createAction, props } from '@ngrx/store';
import { AuthenticateModel } from '../../../auth/models/authentication.model';

/* @export
 * @enum {number}
 */
export enum AuthenticationActionTypes {
  LOGIN = '[SampleData] Login ',
  LOGIN_SUCCESS = '[SampleData] LoginSuccess',
  LOGIN_FAIL = '[SampleData] LoginFail',
  LOGOUT = '[SampleData] Logout ',
  LOGOUT_SUCCESS = '[SampleData] LogoutSuccess',
  LOGOUT_FAIL = '[SampleData] LogoutFail',
}

/* @export
 * @class LogInAction
 * @implements {Action}
 */
export const logInAction = createAction(
  AuthenticationActionTypes.LOGIN,
  props<{ authenticateModel: AuthenticateModel }>(),
);

/* @export
 * @class LogInSuccess
 * @implements {Action}
 */
export const logInSuccess = createAction(
  AuthenticationActionTypes.LOGIN_SUCCESS,
  props<{ token: string }>(),
);

/* @export
 * @class LogInFail
 * @implements {Action}
 */
export const logInFail = createAction(
  AuthenticationActionTypes.LOGIN_FAIL,
  props<{ error: Error }>(),
);

/* @export
 * @class LogOutAction
 * @implements {Action}
 */
export const logOutAction = createAction(AuthenticationActionTypes.LOGOUT);

/* @export
 * @class LogOutSuccess
 * @implements {Action}
 */
export const logOutSuccess = createAction(
  AuthenticationActionTypes.LOGOUT_SUCCESS,
);

/* @export
 * @class LogOutFail
 * @implements {Action}
 */
export const logOutFail = createAction(
  AuthenticationActionTypes.LOGOUT_FAIL,
  props<{ error: Error }>(),
);
