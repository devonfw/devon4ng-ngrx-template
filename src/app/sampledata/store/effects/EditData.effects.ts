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
import {SampleDataService} from '../../../sampledata/services/sampledata.service';
import { AddDataService } from '../../../sampledata/services/add-data.service'
import { AuthService } from '../../../core/security/auth.service';
import {
  AuthActionTypes, editData, editDataSuccess, editDatafail

} from '../actions/oasp-templetes.actions';
import { of } from 'rxjs';
@Injectable()
export class EditataEffects {
  constructor(
    private actions: Actions,
    private AddDataService: AddDataService,
    public authService: AuthService,
    public SampleDataService:SampleDataService

  ) { }

  @Effect()
  Adddata: Observable<any> = this.actions
    .ofType(AuthActionTypes.EDIT_DATA)
    .map((action: editData) => action.payload)
    .switchMap(payload => {
      debugger;
    return this.AddDataService.saveSampleData(payload).map(() => {
      return new editDataSuccess({
      name: payload.name, surname: payload.surname,
        email: payload.email, age: payload.age, id: payload.id
      });
    })
        .catch((error) => {
         return of(new editDatafail({ error: error }));
        });
    });
  @Effect({ dispatch: false })
  editDataSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.EDIT_DATA_SUCCESS),
    tap(() => {
      debugger;
      this.authService.setLogged(true);
      this.SampleDataService.callComponentMethod();
    })
  )
 
}