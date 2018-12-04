import { provideMockActions } from '@ngrx/effects/testing';
  import { TestBed } from '@angular/core/testing';
  import { SampleDataService } from '../../services/sampledata.service';
  import { Observable, Subject } from 'rxjs';
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

import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import * as oasptempletesation from '../actions/oasp-templetes.actions';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { hot, cold } from 'jasmine-marbles';

import { CoreModule } from '../../../core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { Actions } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { Login } from '../../models/login.model';
//import { AddData, AddDataSuccess } from '../actions/oasp-templetes.actions';




 
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
 
  describe('AddData Effects Details', () => {
    describe('AddData', () => {
  it('AddData Effects should work also', () => {
    const action = { type: AuthActionTypes.ADD_DATA };
     const response = cold('-b', { b: true });
    const expected = cold('--c', { c: true });
     const effect$ = new Actions(hot('-a', { a: action }))
      .ofType(AuthActionTypes.ADD_DATA)
      .pipe(switchMap(() => response));
     expect(effect$).toBeObservable(expected);
  });
});
  it('AddDataSuccess Effects should work also', () => {
    const action = { type: AuthActionTypes.ADD_DATA_SUCCESS };
     const response = cold('-b', { b: true });
    const expected = cold('--c', { c: true });
     const effect$ = new Actions(hot('-a', { a: action }))
      .ofType(AuthActionTypes.ADD_DATA_SUCCESS)
      .pipe(switchMap(() => response));
     expect(effect$).toBeObservable(expected);
  });

});
  it('AddDatafail Effects should work also ', () => {
    const action = { type: AuthActionTypes.ADD_DATA_FAIL };
     const response = cold('-b', { b: true });
    const expected = cold('--c', { c: true });
     const effect$ = new Actions(hot('-a', { a: action }))
      .ofType(AuthActionTypes.ADD_DATA_FAIL)
      .pipe(switchMap(() => response)); 
     expect(effect$).toBeObservable(expected);  
  });
  describe('DeleteData Effects Details', () => {
    describe('DeleteData', () => {
      it('DeleteData Effects should work also', () => {
        const action = { type: AuthActionTypes.DELETE_DATA };
         const response = cold('-b', { b: true });
        const expected = cold('--c', { c: true });
         const effect$ = new Actions(hot('-a', { a: action }))
          .ofType(AuthActionTypes.DELETE_DATA)
          .pipe(switchMap(() => response));
         expect(effect$).toBeObservable(expected);
      });
    });
 it('DeleteDataSuccess effect should work', () => {
    actions = new ReplaySubject(1);
    actions.next(DeleteData);
    effects.deleteData.subscribe(result => {
      expect(result).toEqual(DeleteDataSuccess);
  });
  expect().nothing();
   });
   
   it('DeleteDataFail effect should work also', () => {

    const payload = {
      name: 'TESTNAME',
      surname: 'TESTSURNAME',
      email: 'TESTEMAIL',
      age: 12};
    
    actions = new ReplaySubject(1) // = Observable + Observer, 1 = buffer size
    actions.next(new DeleteData(payload));
  
    effects.deleteData.subscribe(result => {
    expect(result).toEqual(new DeleteDataSuccess(payload));
    });
  //   actions = new ReplaySubject(1);

  //   actions.next(DeleteData);
  //   effects.deleteData.subscribe(result => {
  //     expect(result).toEqual(DeleteDataFail);
  // });
  // expect().nothing();
   });

  
  });
});



