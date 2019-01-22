import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../../core/security/auth.service';
import { LoginService } from '../../../core/security/login.service';
import { SampleDataService } from '../../../sampledata/services/sampledata.service';
import {
  SampleDataActionTypes,
  AddData,
  AddDataSuccess,
  AddDataFail,
  DeleteDataSuccess,
  DeleteDataFail,
  EditData,
  EditDataSuccess,
  EditDataFail,
  LogInAction,
  LogInSuccess,
  LogInFail,
  LogOutSuccess,
  DeleteData,
  LogOutAction,
  LogOutFail,
} from '../actions/sampledata.actions';

@Injectable()
export class SampleDataEffects {
  @Effect({ dispatch: false })
  loadDataSuccess: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.LOAD_DATA_SUCCESS),
    tap(() => {
      this.sampledataservice.callComponentMethod();
    }),
  );
  @Effect()
  addData: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.ADD_DATA),
    map((action: AddData) => action.payload),
    switchMap((payload: any) => {
      return this.sampledataservice.saveSampleData(payload).pipe(
        map(
          () =>
            new AddDataSuccess({
              name: payload.name,
              surname: payload.surname,
              email: payload.email,
              age: payload.age,
            }),
        ),
        catchError((error: any) => of(new AddDataFail({ error: error }))),
      );
    }),
  );
  @Effect({ dispatch: false })
  addDataSuccess: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.ADD_DATA_SUCCESS),
    tap(() => {
      this.authservice.setLogged(true);
      this.sampledataservice.callComponentMethod();
    }),
  );
  @Effect()
  deleteData: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.DELETE_DATA),
    map((action: DeleteData) => action.payload),
    switchMap((payload: any) => {
      return this.sampledataservice.deleteSampleData(payload.id).pipe(
        map(() => new DeleteDataSuccess({ id: payload.id })),
        catchError((error: any) => of(new DeleteDataFail({ error: error }))),
      );
    }),
  );
  @Effect({ dispatch: false })
  deleteDataSuccess: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.DELETE_DATA_SUCCESS),
    tap(() => {
      this.authservice.setLogged(true);
      this.sampledataservice.callComponentMethod();
    }),
  );
  @Effect()
  editData: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.EDIT_DATA),
    map((action: EditData) => action.payload),
    switchMap((payload: any) => {
      return this.sampledataservice.editSampleData(payload).pipe(
        map(
          () =>
            new EditDataSuccess({
              name: payload.name,
              surname: payload.surname,
              email: payload.email,
              age: payload.age,
              id: payload.id,
            }),
        ),
        catchError((error: any) => of(new EditDataFail({ error: error }))),
      );
    }),
  );
  @Effect({ dispatch: false })
  editDataSuccess: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.EDIT_DATA_SUCCESS),
    tap(() => {
      this.authservice.setLogged(true);
      this.sampledataservice.callComponentMethod();
    }),
  );
  @Effect()
  logIn: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.LOGIN),

    map((action: LogInAction) => action.payload),
    switchMap((payload: any) => {
      return this.loginservice.login(payload.username, payload.password).pipe(
        map(
          () =>
            new LogInSuccess({
              username: payload.username,
              password: payload.password,
            }),
        ),
        catchError((error: any) => of(new LogInFail({ error: error }))),
      );
    }),
  );
  @Effect({ dispatch: false })
  logInSuccess: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.LOGIN_SUCCESS),
    tap(() => {
      this.loginservice.getCsrf().subscribe((data: any) => {
        this.authservice.setToken(data.token);
        this.authservice.setLogged(true);
        this.router.navigateByUrl('/home');
      });
    }),
  );
  @Effect({ dispatch: false })
  logInFailure: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.LOGIN_FAIL),
    tap((user: any) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/FailpageComponent');
    }),
  );

  @Effect()
  logout: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.LOGOUT),
    map((action: LogOutAction) => {
      //
    }),
    switchMap((payload: any) => {
      return this.loginservice.logout().pipe(
        map(() => new LogOutSuccess()),
        catchError((error: any) => of(new LogOutFail({ error: error }))),
      );
    }),
  );

  @Effect({ dispatch: false })
  logOutSuccess: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.LOGOUT_SUCCESS),
    tap(() => {
      this.loginservice.getCsrf().subscribe(
        () => {
          this.authservice.setLogged(false);
          this.authservice.setToken('');
          this.router.navigateByUrl('/login');
        },
        (err: any) => {
          this.authservice.setLogged(false);
          this.authservice.setToken('');
          this.router.navigateByUrl('/login');
        },
      );
    }),
  );
  constructor(
    private actions: Actions,
    private router: Router,
    public authservice: AuthService,
    private sampledataservice: SampleDataService,
    private loginservice: LoginService,
  ) {}
}
