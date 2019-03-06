import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { tap, map, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../core/security/auth.service';
import { LoginService } from '../../../core/security/login.service';
import { SampledataModel } from '../../../sampledata/models/sampledata.model';
import {
  AuthenticationActionTypes,
  LogInAction,
  LogInSuccess,
  LogInFail,
  LogOutSuccess,
  LogOutAction,
  LogOutFail,
} from '../actions/authentication.actions';
import { Action } from '@ngrx/store';
import { AuthenticateModel } from '../../../auth/models/authentication.model';

/* @export
 * @class AuthenticationEffects
 */
@Injectable()
export class AuthenticationEffects {
  /* @type {Observable<Action>}
   * @memberof AuthenticationEffects
   */
  @Effect()
  login$: Observable<Action> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGIN),
    map((action: LogInAction) => action.payload),
    exhaustMap((payload: AuthenticateModel) =>
      this.loginservice.login(payload.username, payload.password).pipe(
        map((user: AuthenticateModel) => new LogInSuccess({ user })),
        catchError((error: Error) => of(new LogInFail({ error: error }))),
      ),
    ),
  );

  /* @type {Observable<Action>}
   * @memberof AuthenticationEffects
   */
  @Effect({ dispatch: false })
  loginRedirect: Observable<Action> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGIN_SUCCESS),
    tap(() => {
      this.loginservice.getCsrf().subscribe((data: any) => {
        this.authservice.setToken(data.token);
        this.authservice.setLogged(true);
        this.router.navigateByUrl('/home');
      });
    }),
  );

  /* @type {Observable<Action>}
   * @memberof AuthenticationEffects
   */
  @Effect()
  logout: Observable<Action> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGOUT),
    map((action: LogOutAction) => {
      //
    }),
    switchMap((payload: any) => {
      return this.loginservice.logout().pipe(
        map(() => new LogOutSuccess()),
        tap(() => this.router.navigate(['/login'])),
        catchError((error: Error) => of(new LogOutFail({ error: error }))),
      );
    }),
  );

  /* Creates an instance of AuthenticationEffects.
   * @param {Actions} actions
   * @param {Router} router
   * @param {AuthService} authservice
   * @param {LoginService} loginservice
   * @memberof AuthenticationEffects
   */
  constructor(
    private actions: Actions,
    private router: Router,
    public authservice: AuthService,
    private loginservice: LoginService,
  ) {}
}
