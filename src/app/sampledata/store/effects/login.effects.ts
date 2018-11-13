import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';
import "core-js/es7/reflect";
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { Loginservice } from '../../../sampledata/services/login.service';
import { AuthService } from '../../../core/security/auth.service';
import { Login } from '../../models/login.model';
import {
    AuthActionTypes,
    LogInAction, LogInSuccess, LogInFailure,LogOutSuccessAction,loadData,loadDataSuccess
  } from '../actions/oasp-templetes.actions';
  import { of } from 'rxjs';
  import {SampleDataService} from '../../../sampledata/services/sampledata.service';

  debugger;
@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private Loginservice: Loginservice,
    private router: Router,
    public authService: AuthService,
    public SampleDataService:SampleDataService
  ) { console.log('asdadssaa')}
  
  debugger
  
  @Effect()
  
// loadAll$: Observable<any> = this.actions.pipe(
//     ofType(AuthActionTypes.LOAD_DATA), /* When [Contacts] LOAD ALL action is dispatched */
//     startWith(new loadData()),
//     switchMap(() => 
    
//     this.SampleDataService.index()), /* Hit the Contacts Index endpoint of our REST API */
//     /* Dispatch LoadAllSuccess action to the central store with id list returned by the backend as id*/
//     /* 'Contacts Reducers' will take care of the rest */
//     map((contacts: Login[]) => new loadDataSuccess(contacts))
//   );
  @Effect()
LogIn: Observable<any> = this.actions
  .ofType(AuthActionTypes.LOGIN)
  .map((action: LogInAction) => action.payload)
  .switchMap(payload => {//
    debugger;
    console.log("effect side 1" )
    return this.Loginservice.login(payload.username, payload.password)
      .map((user) => {
        console.log(user);
        return new LogInSuccess({username: payload.username, password: payload.password});
        
      })
      .catch((error) => {
        console.log("error side");
        return of(new LogInFailure({ error: error }));
      });
  });
  @Effect({ dispatch: false })
LogInSuccess: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.LOGIN_SUCCESS),
  tap((user) => {console.log("effect side 2")
  //console.log("effect side 2")
    this.Loginservice.getCsrf().subscribe((data: any) => {
      this.authService.setToken(data.token);
      this.authService.setLogged(true);
     // console.log('data.token' +data.token)
      this.router.navigateByUrl('/home');
    });
    
  })
)
@Effect({ dispatch: false })
LogInFailure: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.LOGIN_FAILURE),
  tap((user) => {console.log("effect side 2")
  localStorage.setItem('token', user.payload.token);
  this.router.navigateByUrl('/FailpageComponent');
})
)



@Effect()
Logout: Observable<any> = this.actions
  .ofType(AuthActionTypes.LOGOUT)
  .map((action: LogInAction) => action.payload)
  .switchMap(payload => {console.log("effect side 1")
    return this.Loginservice.logout()
      .map((user) => {
        debugger;
        console.log('insdei sude');
        return new LogOutSuccessAction();
        
      })
      .catch((error) => {
        console.log("error side");
        return of(new LogInFailure({ error: error }));
      });
  });
  @Effect({ dispatch: false })
  LogOutSuccessAction: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.LOGOUT_SUCCESS),
  tap((user) => {console.log("logout effect")
  console.log("log out effect inside")
  debugger;
    this.Loginservice.getCsrf().subscribe((data: any) => {
            this.authService.setLogged(false);
            this.authService.setToken('');
            this.router.navigateByUrl('/login');
           },
           (err: any) => {
           //   Logout error. Exiting anyway...
             this.authService.setLogged(false);
             this.authService.setToken('');
             this.router.navigateByUrl('/login');
           },);
    
  })
)

}

