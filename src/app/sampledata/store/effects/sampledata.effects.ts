import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../../core/security/auth.service';
import { SampleDataService } from '../../../sampledata/services/sampledata.service';
import {
  SampleDataActionTypes,
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
} from '../actions/sampledata-templetes.actions';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Login } from '../../models/login.model';

@Injectable()
export class SampleDataEffects {

  @Effect({ dispatch: false })
  loadDataSuccess: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.LOAD_DATA_SUCCESS),
    tap(() => {
      this.sampledataservice.callComponentMethod();
    }, ),
  );
  @Effect()// Add Data start
  addData: Observable<any> = this.actions
    .ofType(SampleDataActionTypes.ADD_DATA)
    .map((action: AddData) => action.payload)
    .switchMap((payload: any) => {
      return this.sampledataservice.saveSampleData(payload).map(() => {
        return new AddDataSuccess({
          name: payload.name, surname: payload.surname,
          email: payload.email, age: payload.age,
        });
      }).catch((error: any) => {
          return of(new AddDatafail({ error: error }));
        });
    });
  @Effect({ dispatch: false })
  addDataSuccess: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.ADD_DATA_SUCCESS),
    tap(() => {
      this.authservice.setLogged(true);
      this.sampledataservice.callComponentMethod();
    }, ),
  ); // Add Data End

  @Effect()// Delete started
  deleteData: Observable<any> = this.actions
    .ofType(SampleDataActionTypes.DELETE_DATA)
    .map((action: AddData) => action.payload)
    .switchMap((payload: any) => {
      return this.sampledataservice.deleteSampleData(payload.id).map(() => {
        return new DeleteDataSuccess({ id: payload.id });
      }).catch((error: any) => {
          return of(new DeleteDataFail({ error: error }));
        });
    });
  @Effect({ dispatch: false })
  deleteDataSuccess: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.DELETE_DATA_SUCCESS),
    tap(() => {
      this.authservice.setLogged(true);
      this.sampledataservice.callComponentMethod();
    }, ),
  ); // delete Data End

  @Effect() // edit started
  editData: Observable<any> = this.actions
    .ofType(SampleDataActionTypes.EDIT_DATA)
    .map((action: EditData) => action.payload)
    .switchMap((payload: any) => {
      return this.sampledataservice.editSampleData(payload).map(() => {
        return new EditDataSuccess({
          name: payload.name, surname: payload.surname,
          email: payload.email, age: payload.age, id: payload.id,
        });
      }).catch((error: any) => {
          return of(new EditDataFail({ error: error }));
        });
    });
  @Effect({ dispatch: false })
  editDataSuccess: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.EDIT_DATA_SUCCESS),
    tap(() => {
      this.authservice.setLogged(true);
      this.sampledataservice.callComponentMethod();
    }, ),
  ); // Edit Data Finished

  @Effect()         // Login started
  logIn: Observable<any> = this.actions
    .ofType(SampleDataActionTypes.LOGIN)
    .map((action: LogInAction) => action.payload)
    .switchMap((payload: any) => {
      return this.sampledataservice.login(payload.username, payload.password)
        .map(() => {
          return new LogInSuccess({
            username: payload.username,
            password: payload.password,
          });
        }).catch((error: any) => {
          return of(new LogInFailure({ error: error }));
        });
    });
  @Effect({ dispatch: false })
  logInSuccess: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.LOGIN_SUCCESS),
    tap(() => {
      this.sampledataservice.getCsrf().subscribe((data: any) => {
        this.authservice.setToken(data.token);
        this.authservice.setLogged(true);
        this.router.navigateByUrl('/home');
      });
    }, ),
  );
  @Effect({ dispatch: false })
  logInFailure: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.LOGIN_FAILURE),
    tap((user: any) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/FailpageComponent');
    }, ),
  );
  @Effect()
  logout: Observable<any> = this.actions
    .ofType(SampleDataActionTypes.LOGOUT)
    .map((action: LogInAction) => action.payload)
    .switchMap((payload: any) => {
      return this.sampledataservice.logout()
        .map(() => { return new LogOutSuccessAction(); })
        .catch((error: any) => {
          return of(new LogInFailure({ error: error }));
        });
    });
  @Effect({ dispatch: false })
  logOutSuccessAction: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.LOGOUT_SUCCESS),
    tap(() => {
      this.sampledataservice.getCsrf().subscribe((data: any) => {
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
    }, ),
  ); // Login Finished
  @Effect()
  searchData: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.SEARCH_DATA),
    map((action: SearchData) => action.payload),
    switchMap((payload: any) => this.sampledataservice.getSampleData(payload.pageSize,
      payload.pagination, payload.searchTerms, payload.test)),
    map((searchdata: Login) => new SearchDataSuccess(searchdata)),
  );
  @Effect({ dispatch: false })
  searchDataSuccess: Observable<any> = this.actions.pipe(
    ofType(SampleDataActionTypes.SEARCH_DATA_SUCCESS),
    tap(() => {
      this.sampledataservice.callComponentMethod();
    }, ),
  );
  constructor(
    private actions: Actions,
    private router: Router,
    public authservice: AuthService,
    private sampledataservice: SampleDataService,
  ) { }

}
