import { Injectable,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';
import "core-js/es7/reflect";
import {AddDataService } from '../../../sampledata/services/add-data.service'
import { AuthService } from '../../../core/security/auth.service';
import {SampleDataService} from '../../../sampledata/services/sampledata.service';
import {SampledataGridDisplayComponent} from '../../sampledata-grid-display/sampledata-grid-display.component'

import {
  AuthActionTypes, AddData,AddDataSuccess,AddDatafail
    
  } from '../actions/oasp-templetes.actions';
  import { of } from 'rxjs';
 
@Injectable()
export class AddDataEffects {
  @ViewChild(SampledataGridDisplayComponent) otherCompt: SampledataGridDisplayComponent
    
  constructor(
    private actions: Actions,
    private AddDataService: AddDataService,
    private router: Router,
    public authService: AuthService,
    private SampleDataService: SampleDataService,
    
  ) {}

  @Effect()
Adddata: Observable<any> = this.actions
  .ofType(AuthActionTypes.ADD_DATA)
  .map((action: AddData) => action.payload)
  .switchMap(payload => { return this.AddDataService.saveSampleData(payload).map((user) => 
    {
         return new AddDataSuccess({name: payload.name, surname: payload.surname
        ,email: payload.email,age: payload.age});
       
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
)

}