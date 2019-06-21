import { Action } from '@ngrx/store';
import { SampledataModel } from '../../../sampledata/models/sampledata.model';
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
export class LogInAction implements Action {
  readonly type: AuthenticationActionTypes = AuthenticationActionTypes.LOGIN;
  constructor(public payload: AuthenticateModel) {}
}

/* @export
 * @class LogInSuccess
 * @implements {Action}
 */
export class LogInSuccess implements Action {
  readonly type: AuthenticationActionTypes =
    AuthenticationActionTypes.LOGIN_SUCCESS;
  constructor(public payload: { token: string }) {}
}

/* @export
 * @class LogInFail
 * @implements {Action}
 */
export class LogInFail implements Action {
  readonly type: AuthenticationActionTypes =
    AuthenticationActionTypes.LOGIN_FAIL;
  constructor(public payload: { error: Error }) {}
}

/* @export
 * @class LogOutAction
 * @implements {Action}
 */
export class LogOutAction implements Action {
  readonly type: AuthenticationActionTypes = AuthenticationActionTypes.LOGOUT;
}

/* @export
 * @class LogOutSuccess
 * @implements {Action}
 */
export class LogOutSuccess implements Action {
  readonly type: AuthenticationActionTypes =
    AuthenticationActionTypes.LOGOUT_SUCCESS;
}

/* @export
 * @class LogOutFail
 * @implements {Action}
 */
export class LogOutFail implements Action {
  readonly type: AuthenticationActionTypes =
    AuthenticationActionTypes.LOGOUT_FAIL;
  constructor(public payload: { error: Error }) {}
}
export type AuthenticationAction =
  | LogInAction
  | LogInSuccess
  | LogInFail
  | LogOutAction
  | LogOutSuccess
  | LogOutFail;
