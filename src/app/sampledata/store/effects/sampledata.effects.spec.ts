import { provideMockActions } from '@ngrx/effects/testing';
  import { TestBed } from '@angular/core/testing';
  import { SampleDataService } from '../../services/sampledata.service';
  import { Router } from '@angular/router';
  import { Observable, empty, Subject } from 'rxjs';
  import {
    AuthActionTypes,
    AddData,
    AddDataSuccess,
    AddDatafail,
    DeleteData,
    DeleteDataSuccess,
    DeleteDataFail,
    EditData,
    EditDataSuccess,
    EditDataFail,
  } from '../actions/oasp-templetes.actions';
import { sampledataeffects } from './sampledata.effects';
import { generateUser } from '../../models/login.model';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import * as froasptempletes from '../actions/oasp-templetes.actions';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { hot, cold } from 'jasmine-marbles';
import {HttpHandler,} from '@angular/common/http';
import { CoreModule } from '../../../core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { Actions } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

 
describe('sampledataeffects', () => {
    let actions: Observable<any>;
    let effects: sampledataeffects;
    let userService: SampleDataService;
    //let authService :AuthService
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
          CoreModule,
          BrowserModule,
          HttpClientModule
         ],
      providers: [
        sampledataeffects,
        provideMockActions(() => actions),
        SampleDataService
      ],
    });
 
    effects = TestBed.get(sampledataeffects);
  });
  it('AddData should work also', () => {
    const action = { type: AuthActionTypes.ADD_DATA };
     const response = cold('-b', { b: true });
    const expected = cold('--c', { c: true });
     const effect$ = new Actions(hot('-a', { a: action }))
      .ofType(AuthActionTypes.ADD_DATA)
      .pipe(switchMap(() => response));
     expect(effect$).toBeObservable(expected);
  });
  it('AddDataSuccess should work also', () => {
    const action = { type: AuthActionTypes.ADD_DATA_SUCCESS };
     const response = cold('-b', { b: true });
    const expected = cold('--c', { c: true });
     const effect$ = new Actions(hot('-a', { a: action }))
      .ofType(AuthActionTypes.ADD_DATA_SUCCESS)
      .pipe(switchMap(() => response));
     expect(effect$).toBeObservable(expected);
  });
  it('AddDatafail should work also should work also', () => {
    const action = { type: AuthActionTypes.ADD_DATA_FAIL };
     const response = cold('-b', { b: true });
    const expected = cold('--c', { c: true });
     const effect$ = new Actions(hot('-a', { a: action }))
      .ofType(AuthActionTypes.ADD_DATA_FAIL)
      .pipe(switchMap(() => response)); 
     expect(effect$).toBeObservable(expected);  
  });
 it('DeleteDataSuccess effect should work', () => {
    actions = new ReplaySubject(1);
    actions = new Subject(); 
    actions.next(AddData);
    effects.deleteData.subscribe(result => {
      expect(result).toEqual(AddDataSuccess);
  });
   });
   it('DeleteDataFail effect should work', () => {
    actions = new ReplaySubject(1);
    actions = new Subject(); 
    actions.next(DeleteData);
    effects.deleteData.subscribe(result => {
      expect(result).toEqual(DeleteDataFail);
  });
   });





});

