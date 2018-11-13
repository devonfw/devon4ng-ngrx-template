// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/catch';
// import { tap } from 'rxjs/operators';
// import "core-js/es7/reflect";
// import {SampleDataService} from '../../../sampledata/services/sampledata.service';
// import { AddDataService } from '../../../sampledata/services/add-data.service'
// import { AuthService } from '../../../core/security/auth.service';
// import {
//   AuthActionTypes, loadData, editDataSuccess, editDatafail

// } from '../actions/oasp-templetes.actions';
// import { of } from 'rxjs';
// import { Login } from '../../../sampledata/models/login.model';
// import {catchError, map, startWith, switchMap} from 'rxjs/operators';
// import {Action} from '@ngrx/store';
// import { AppState } from '../store/app.states';
// @Injectable()
// export class LoadDataEffects {
//   private sorting: any[] = [];
//   constructor(
//     private actions: Actions,
//     private AddDataService: AddDataService,
//     private router: Router,
//     public authService: AuthService,
//     public SampleDataService:SampleDataService

//   ) { }

//   @Effect()
//   loadAll$: Observable<Action> = this.actions.pipe(
//       ofType(AuthActionTypes.LOAD_DATA), /* When [Contacts] LOAD ALL action is dispatched */
//       startWith(new loadData()),
//       switchMap(() => this.SampleDataService.index()), /* Hit the Contacts Index endpoint of our REST API */
//       /* Dispatch LoadAllSuccess action to the central store with id list returned by the backend as id*/
//       /* 'Contacts Reducers' will take care of the rest */
//       map((contacts: Contact[]) => new LoadAllSuccess(contacts))
//     );
 
    
// }