import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { tap } from 'rxjs/operators';

import { AuthService } from '../../../core/security/auth.service';
import { SampleDataService } from '../../../sampledata/services/sampledata.service';
import {
  AuthActionTypes,
  AddData,
  AddDataSuccess,
  AddDatafail,
  DeleteDataSuccess,
  DeleteDataFail,
  EditData,
  EditDataSuccess,
  EditDataFail,
  LogInAction,
  LogInSuccess,
  LogInFailure,
  LogOutSuccessAction,
  SearchData,
  SearchDataSuccess,

} from '../actions/oasp-templetes.actions';
import { of } from 'rxjs';
import {map,switchMap} from 'rxjs/operators';
import { Login } from '../../models/login.model';

@Injectable()
export class sampledataeffects {
  constructor(
    private actions: Actions,
    private router: Router,
    public authService: AuthService,
    private SampleDataService: SampleDataService,

  ) { }

  @Effect({ dispatch: false })
  loadDataSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOAD_DATA_SUCCESS),
    tap((user) => {
      
      this.SampleDataService.callComponentMethod();
    })
  )
  @Effect()//Add Data start
  AddData: Observable<any> = this.actions
    .ofType(AuthActionTypes.ADD_DATA)
    .map((action: AddData) => action.payload)
    .switchMap(payload => {
      return this.SampleDataService.saveSampleData(payload).map((user) => {
        return new AddDataSuccess({
          name: payload.name, surname: payload.surname
          , email: payload.email, age: payload.age
        });
      })
        .catch((error) => {
          return of(new AddDatafail({ error: error }));
        });
    });
  @Effect({ dispatch: false })
  AddDataSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.ADD_DATA_SUCCESS),
    tap((user) => {
      this.authService.setLogged(true);
      this.SampleDataService.callComponentMethod();
    })
  )//Add Data End 

  @Effect()//Delete started
  deleteData: Observable<any> = this.actions
    .ofType(AuthActionTypes.DELETE_DATA)
    .map((action: AddData) => action.payload)
    .switchMap(payload => {
      return this.SampleDataService.deleteSampleData(payload.id).map((user) => {
        return new DeleteDataSuccess({ id: payload.id });
      })
        .catch((error) => {
          return of(new DeleteDataFail({ error: error }));
        });
    });
  @Effect({ dispatch: false })
  deleteDataSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.DELETE_DATA_SUCCESS),
    tap(() => {
      this.authService.setLogged(true);
      this.SampleDataService.callComponentMethod();
    })
  )//delete Data End

  @Effect() // edit started
  editData: Observable<any> = this.actions
    .ofType(AuthActionTypes.EDIT_DATA)
    .map((action: EditData) => action.payload)
    .switchMap(payload => {
      return this.SampleDataService.editSampleData(payload).map(() => {
        return new EditDataSuccess({
          name: payload.name, surname: payload.surname,
          email: payload.email, age: payload.age, id: payload.id
        });
      })
        .catch((error) => {
          return of(new EditDataFail({ error: error }));
        });
    });
  @Effect({ dispatch: false })
  editDataSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.EDIT_DATA_SUCCESS),
    tap(() => {
      this.authService.setLogged(true);
      this.SampleDataService.callComponentMethod();
    })
  )//Edit Data Finished

  @Effect()         //Login started
  logIn: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGIN)
    .map((action: LogInAction) => action.payload)
    .switchMap(payload => {
      return this.SampleDataService.login(payload.username, payload.password)
        .map((user) => {
          return new LogInSuccess({
            username: payload.username,
            password: payload.password
          });
        })
        .catch((error) => {
          return of(new LogInFailure({ error: error }));
        });
    });
  @Effect({ dispatch: false })
  logInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      this.SampleDataService.getCsrf().subscribe((data: any) => {
        this.authService.setToken(data.token);
        this.authService.setLogged(true);
        this.router.navigateByUrl('/home');
      });
    })
  )
  @Effect({ dispatch: false })
  logInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap((user) => {

      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/FailpageComponent');
    })
  )
  @Effect()
  logout: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGOUT)
    .map((action: LogInAction) => action.payload)
    .switchMap(payload => {
      return this.SampleDataService.logout()
        .map((user) => { return new LogOutSuccessAction(); })
        .catch((error) => {
          return of(new LogInFailure({ error: error }));
        });
    });
  @Effect({ dispatch: false })
  logOutSuccessAction: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT_SUCCESS),
    tap((user) => {
      this.SampleDataService.getCsrf().subscribe((data: any) => {
        this.authService.setLogged(false);
        this.authService.setToken('');
        this.router.navigateByUrl('/login');
      },
        (err: any) => {
          this.authService.setLogged(false);
          this.authService.setToken('');
          this.router.navigateByUrl('/login');
        });
    })
  )//Login Finished
  @Effect()
  searchData: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SEARCH_DATA),
    map( (action: SearchData ) => action.payload),
    switchMap((payload) => this.SampleDataService.getSampleData(payload.pageSize,
      payload.pagination,payload.searchTerms,payload.test)),
    map((searchdata: Login) => new SearchDataSuccess(searchdata))
  );
  @Effect({ dispatch: false })
  SearchDataSuccess: Observable<any> = this.actions.pipe(
 ofType(AuthActionTypes.SEARCH_DATA_SUCCESS),
  tap((user) => {
    this.SampleDataService.callComponentMethod();
 })
)}