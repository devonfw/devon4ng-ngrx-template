import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { tap, map, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../core/security/auth.service';
import { LoginService } from '../../../core/security/login.service';
import { SampledataModel } from '../../models/sampledata.model';
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
import { AuthenticateModel } from '../../models/authentication.model';
@Injectable()
export class AuthenticationEffects {
  @Effect()
  login$: Observable<Action> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGIN),
    map((action: LogInAction) => action.payload),
    exhaustMap((payload: AuthenticateModel) =>
      this.loginservice.login(payload.username, payload.password).pipe(
        map((user: SampledataModel) => new LogInSuccess({ user })),
        catchError((error: Error) => of(new LogInFail({ error: error }))),
      ),
    ),
  );
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
  constructor(
    private actions: Actions,
    private router: Router,
    public authservice: AuthService,
    private loginservice: LoginService,
  ) {}
}
