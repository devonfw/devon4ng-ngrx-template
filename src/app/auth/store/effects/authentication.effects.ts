import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { tap, map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../core/security/auth.service';
import { LoginService } from '../../../core/security/login.service';
import { environment } from '../../../../environments/environment';
import {
  logInSuccess,
  logInFail,
  logOutSuccess,
  logOutFail,
  AuthenticationActionTypes,
} from '../actions/authentication.actions';
import { Action } from '@ngrx/store';
import { AuthenticateModel } from '../../../auth/models/authentication.model';
import { HttpResponse } from '@angular/common/http';
import { TypedAction } from '@ngrx/store/src/models';

/* @export
 * @class AuthenticationEffects
 */
@Injectable()
export class AuthenticationEffects {
  /* @type {Observable<Action>}
   * @memberof AuthenticationEffects
   */
  login$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(AuthenticationActionTypes.LOGIN),
      map(
        (
          action: {
            payload: AuthenticateModel;
          } & TypedAction<AuthenticationActionTypes.LOGIN>,
        ) => action.payload,
      ),
      switchMap((payload: AuthenticateModel) => {
        return this.loginservice.login(payload.username, payload.password).pipe(
          map((response: HttpResponse<any>) => {
            let token: string = '';
            if (environment.security === 'jwt') {
              token = response.headers.get('authorization');
            }
            return logInSuccess({ token });
          }),
          catchError((error: Error) => of(logInFail({ error: error }))),
        );
      }),
    ),
  );

  /* @type {Observable<Action>}
   * @memberof AuthenticationEffects
   */
  loginRedirect: Observable<Action> = createEffect(
    () =>
      this.actions.pipe(
        ofType(logInSuccess),
        tap(
          (
            action: {
              payload: {
                token: string;
              };
            } & TypedAction<AuthenticationActionTypes.LOGIN_SUCCESS>,
          ) => {
            if (environment.security === 'csrf') {
              this.loginservice.getCsrf().subscribe((data: any) => {
                this.authservice.setToken(data.token);
                this.authservice.setLogged(true);
                this.router.navigate(['/home']);
              });
            }

            if (environment.security === 'jwt') {
              this.authservice.setToken(action.payload.token);
              this.authservice.setLogged(true);
              this.router.navigateByUrl('/home');
            }
          },
        ),
      ),
    { dispatch: false },
  );

  /* @type {Observable<Action>}
   * @memberof AuthenticationEffects
   */
  logout: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(AuthenticationActionTypes.LOGOUT),
      map((action: any) => {
        //
      }),
      switchMap((payload: any) => {
        return this.loginservice.logout().pipe(
          map(() => logOutSuccess()),
          tap(() => this.router.navigate(['/login'])),
          catchError((error: Error) => of(logOutFail({ error: error }))),
        );
      }),
    ),
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
