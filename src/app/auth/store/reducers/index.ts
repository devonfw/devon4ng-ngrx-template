import * as AuthDataState from './authentication.reducers';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export * from '../effects';

/* @export
 * @interface Authentication
 */
export interface Authentication {
  authData: AuthDataState.AuthState;
}
export const reducers: ActionReducerMap<Authentication> = {
  authData: AuthDataState.reducer,
};
export const getAuthState: any = createFeatureSelector<Authentication>(
  'authdatareducer',
);
