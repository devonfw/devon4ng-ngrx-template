import {
  logInAction,
  logInSuccess,
  logInFail,
  logOutAction,
  logOutSuccess,
  logOutFail,
} from '../actions/authentication.actions';
import { createReducer, on, ActionReducer, Action } from '@ngrx/store';

/* @export
 * @interface AuthState
 */
export interface AuthState {
  isLoggedIn: boolean;
  errorMessage: string | null;
  textMessage: string | null;
}
export const initialState: AuthState = {
  isLoggedIn: false,
  errorMessage: undefined,
  textMessage: undefined,
};

/* @export
 * @param {AuthState} [state=initialState]
 * @param {AuthenticationAction} action
 * @returns {AuthState}
 */
const authReducer: ActionReducer<
  {
    errorMessage: string;
    isLoggedIn: boolean;
    textMessage: string;
  },
  Action
> = createReducer(
  initialState,
  on(logInAction, (state: AuthState) => ({
    ...state,
    isLoggedIn: false,
  })),
  on(logInSuccess, (state: AuthState) => ({
    ...state,
    isLoggedIn: true,
  })),
  on(logInFail, (state: AuthState) => ({
    ...state,
    errorMessage: 'Incorrect username and/or password.',
  })),
  on(logOutAction, (state: AuthState) => ({
    ...state,
    textMessage: 'Logging Out.',
  })),
  on(logOutSuccess, (state: AuthState) => initialState),
  on(logOutFail, (state: AuthState) => ({
    ...state,
    errorMessage: 'Something went wrong !!!!.',
  })),
);

export const reducer = (
  state: AuthState | undefined,
  action: Action,
): {
  errorMessage: string;
  isLoggedIn: boolean;
  textMessage: string;
} => authReducer(state, action);

export const getSelectUser: any = (state: AuthState) => state.isLoggedIn;
export const getSelectError: any = (state: AuthState) => state.errorMessage;
export const getTextMessage: any = (state: AuthState) => state.textMessage;
