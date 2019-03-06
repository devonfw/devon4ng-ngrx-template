import {
  AuthenticationActionTypes,
  AuthenticationAction,
} from '../actions/authentication.actions';

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
export function reducer(
  state: AuthState = initialState,
  action: AuthenticationAction,
): AuthState {
  switch (action.type) {
    case AuthenticationActionTypes.LOGIN:
      return { ...state, isLoggedIn: false };
    case AuthenticationActionTypes.LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true };
    case AuthenticationActionTypes.LOGIN_FAIL: {
      return { ...state, errorMessage: 'Incorrect username and/or password.',
      };
    }
    case AuthenticationActionTypes.LOGOUT:
      return { ...state, textMessage: 'Logging Out.' };
    case AuthenticationActionTypes.LOGOUT_SUCCESS:
      return initialState;
    case AuthenticationActionTypes.LOGOUT_FAIL:
      return { ...state, errorMessage: 'Something went wrong !!!!.',
      };
    default:
      return state;
  }
}
export const getSelectUser: any = (state: AuthState) => state.isLoggedIn;
export const getSelectError: any = (state: AuthState) => state.errorMessage;
export const getTextMessage: any = (state: AuthState) => state.textMessage;
