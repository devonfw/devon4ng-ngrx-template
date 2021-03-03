import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/security/auth.service';
import { LoginService } from '../../../core/security/login.service';
import {
  logInAction,
  logInFail,
  logInSuccess,
  logOutAction,
  logOutFail,
  logOutSuccess,
} from '../actions/authentication.actions';

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
      ofType(logInAction),
      map((authenticateModel) => authenticateModel.authenticateModel),
      switchMap((authenticateModel: any) =>
        this.loginservice
          .login(authenticateModel.username, authenticateModel.password)
          .pipe(
            map((response: HttpResponse<any>) => {
              let token = '';
              if (environment.security === 'jwt') {
                token = response.headers.get('authorization');
              }
              return logInSuccess({ token });
            }),
            catchError((error: Error) => of(logInFail({ error }))),
          ),
      ),
    ),
  );

  /* @type {Observable<Action>}
   * @memberof AuthenticationEffects
   */
  loginRedirect: Observable<Action> = createEffect(
    () =>
      this.actions.pipe(
        ofType(logInSuccess),
        tap((action) => {
          if (environment.security === 'csrf') {
            this.loginservice.getCsrf().subscribe((data: any) => {
              this.authservice.setToken(data.token);
              this.authservice.setLogged(true);
              this.router.navigate(['/home//initial']);
            });
          }

          if (environment.security === 'jwt') {
            this.authservice.setToken(action.token);
            this.authservice.setLogged(true);
            this.router.navigate(['/home/initial']);
          }
        }),
        catchError((error: Error) => of(logInFail({ error }))),
      ),
    { dispatch: false },
  );

  /* @type {Observable<Action>}
   * @memberof AuthenticationEffects
   */
  logout: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(logOutAction),
      map((action: any) => {
        //
      }),
      switchMap((payload: any) =>
        this.loginservice.logout().pipe(
          map(() => logOutSuccess()),
          tap(() => this.router.navigate(['/login'])),
          catchError((error: Error) => of(logOutFail({ error }))),
        ),
      ),
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
