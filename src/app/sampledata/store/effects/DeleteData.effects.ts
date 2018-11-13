import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {SampleDataService} from '../../../sampledata/services/sampledata.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';
import "core-js/es7/reflect";
import { AuthService } from '../../../core/security/auth.service';
import { DeletedataService }  from '../../../sampledata/services/deletedata.service'
import {
  AuthActionTypes, AddData,AddDatafail,deleteDataSuccess
    
  } from '../actions/oasp-templetes.actions';
  import { of } from 'rxjs';
 
@Injectable()
export class DeleteDataEffects {

  constructor(
    private actions: Actions,
    private router: Router,
    public authService: AuthService,
    public DeletedataService: DeletedataService,
    private SampleDataService: SampleDataService,
    
  ) {}

  @Effect()
  deleteData: Observable<any> = this.actions
  .ofType(AuthActionTypes.DELETE_DATA)
  .map((action: AddData) => action.payload)
  .switchMap(payload => {
  
    return this.DeletedataService.DeleteDataDB(payload.id).map((user) => {
       
        return new deleteDataSuccess({id: payload.id});
        
      })
      .catch((error) => {
       
        return of(new AddDatafail({ error: error }));
      });
  });
  @Effect({ dispatch: false })
  deleteDataSuccess: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.DELETE_DATA_SUCCESS),
  tap(() => {
   debugger
    this.authService.setLogged(true);
    this.SampleDataService.callComponentMethod();
  
  })
)

}