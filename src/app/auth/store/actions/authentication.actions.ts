import { Action, createAction, union, Creator } from '@ngrx/store';
import { SampleDataModel } from '../../../sampledata/models/sampledata.model';
import { AuthenticateModel } from '../../../auth/models/authentication.model';
import {
  FunctionWithParametersType,
  TypedAction,
  ActionCreator,
} from '@ngrx/store/src/models';

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
export const logInAction: FunctionWithParametersType<
  [AuthenticateModel],
  {
    payload: AuthenticateModel;
  } & TypedAction<AuthenticationActionTypes.LOGIN>
> &
  TypedAction<AuthenticationActionTypes.LOGIN> = createAction(
  AuthenticationActionTypes.LOGIN,
  (payload: AuthenticateModel) => ({ payload }),
);

/* @export
 * @class LogInSuccess
 * @implements {Action}
 */
export const logInSuccess: FunctionWithParametersType<
  [
    {
      token: string;
    },
  ],
  {
    payload: {
      token: string;
    };
  } & TypedAction<AuthenticationActionTypes.LOGIN_SUCCESS>
> &
  TypedAction<AuthenticationActionTypes.LOGIN_SUCCESS> = createAction(
  AuthenticationActionTypes.LOGIN_SUCCESS,
  (payload: { token: string }) => ({ payload }),
);

/* @export
 * @class LogInFail
 * @implements {Action}
 */
export const logInFail: FunctionWithParametersType<
  [
    {
      error: Error;
    },
  ],
  {
    payload: {
      error: Error;
    };
  } & TypedAction<AuthenticationActionTypes.LOGIN_FAIL>
> &
  TypedAction<AuthenticationActionTypes.LOGIN_FAIL> = createAction(
  AuthenticationActionTypes.LOGIN_FAIL,
  (payload: { error: Error }) => ({ payload }),
);

/* @export
 * @class LogOutAction
 * @implements {Action}
 */
export const logOutAction: ActionCreator<
  AuthenticationActionTypes.LOGOUT,
  () => TypedAction<AuthenticationActionTypes.LOGOUT>
> = createAction(AuthenticationActionTypes.LOGOUT);

/* @export
 * @class LogOutSuccess
 * @implements {Action}
 */
export const logOutSuccess: ActionCreator<
  AuthenticationActionTypes.LOGOUT_SUCCESS,
  () => TypedAction<AuthenticationActionTypes.LOGOUT_SUCCESS>
> = createAction(AuthenticationActionTypes.LOGOUT_SUCCESS);

/* @export
 * @class LogOutFail
 * @implements {Action}
 */
export const logOutFail: FunctionWithParametersType<
  [
    {
      error: Error;
    },
  ],
  {
    payload: {
      error: Error;
    };
  } & TypedAction<AuthenticationActionTypes.LOGOUT_FAIL>
> &
  TypedAction<AuthenticationActionTypes.LOGOUT_FAIL> = createAction(
  AuthenticationActionTypes.LOGOUT_FAIL,
  (payload: { error: Error }) => ({ payload }),
);
