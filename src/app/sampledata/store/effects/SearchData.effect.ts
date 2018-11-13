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
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {AddDataService } from '../../../sampledata/services/add-data.service'
import { AuthService } from '../../../core/security/auth.service';
import {SampleDataService} from '../../../sampledata/services/sampledata.service';
import {SampledataGridDisplayComponent} from '../../sampledata-grid-display/sampledata-grid-display.component'
import {TdDataTableComponent,
    
  } from '@covalent/core';
import {
  AuthActionTypes, SearchDataSuccess,SearchData,errorSearchData
    
  } from '../actions/oasp-templetes.actions';
  
  import { Login } from '../../models/login.model';
  import { Pagination } from '../../../core/interfaces/pagination';
@Injectable()
export class SearchDataEffects {
    @ViewChild(SampledataGridDisplayComponent) otherCompt: SampledataGridDisplayComponent
    @ViewChild('dataTable') dataTable: TdDataTableComponent;
    private pagination: Pagination = {
        size: 8,
        page: 1,
        total: 1,
      };
  constructor(
    private actions: Actions,
    private AddDataService: AddDataService,
    private router: Router,
    public authService: AuthService,
    private SampleDataService: SampleDataService,
   
  ) {}



    @Effect()
    load$: Observable<any> = this.actions.pipe(
      ofType(AuthActionTypes.SEARCH_DATA),
      map( (action: SearchData ) => action.payload),
      switchMap((payload) => this.SampleDataService.
      getSampleData(payload.pageSize,payload.pagination,payload.searchTerms,payload.test)),
      map((contact: Login) => new SearchDataSuccess(contact))
    );


    @Effect({ dispatch: false })
       SearchDataSuccess: Observable<any> = this.actions.pipe(
      ofType(AuthActionTypes.SEARCH_DATA_SUCCESS),
       tap((user) => {
         this.SampleDataService.callComponentMethod();
      })
     )

  
}