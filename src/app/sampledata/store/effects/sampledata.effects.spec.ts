import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { SampleDataService } from '../../services/sampledata.service';
import { Observable } from 'rxjs';
import {
  SampleDataActionTypes,
  // DeleteData,
 // DeleteDataSuccess,
} from '../actions/sampledata-templetes.actions';
import { SampleDataEffects } from './sampledata.effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
// import * as oasptempletesation from '../actions/oasp-templetes.actions';
// import { ReplaySubject } from 'rxjs/ReplaySubject';
import { hot, cold } from 'jasmine-marbles';
import { CoreModule } from '../../../core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { Actions } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
// import { DeleteDataFail } from '../actions/oasp-templetes.actions';

describe('sampledataeffects', () => {
  let actions: Observable<any>;
  // let effects: SampleDataEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        CoreModule,
        BrowserModule,
        HttpClientModule,
      ],
      providers: [
        SampleDataEffects,
        provideMockActions(() => actions),
        SampleDataService,
      ],
    });
    // effects = TestBed.get(SampleDataEffects);
  });
  describe('AddData Effects Details', () => {
    describe('AddData', () => {
      it('AddData Effects should work also', () => {
        const action: any = { type: SampleDataActionTypes.ADD_DATA };
        const response: any = cold('-b', { b: true });
        const expected: any = cold('--c', { c: true });
        const effect$: any = new Actions(hot('-a', { a: action }))
          .ofType(SampleDataActionTypes.ADD_DATA)
          .pipe(switchMap(() => response));
        expect(effect$).toBeObservable(expected);
      });
    });
    it('AddDataSuccess Effects should work also', () => {
      const action: any  = { type: SampleDataActionTypes.ADD_DATA_SUCCESS };
      const response: any  = cold('-b', { b: true });
      const expected: any  = cold('--c', { c: true });
      const effect$: any  = new Actions(hot('-a', { a: action }))
        .ofType(SampleDataActionTypes.ADD_DATA_SUCCESS)
        .pipe(switchMap(() => response));
      expect(effect$).toBeObservable(expected);
    });
  });
  it('AddDatafail Effects should work also ', () => {
    const action: any  = { type: SampleDataActionTypes.ADD_DATA_FAIL };
    const response: any  = cold('-b', { b: true });
    const expected: any  = cold('--c', { c: true });
    const effect$: any  = new Actions(hot('-a', { a: action }))
      .ofType(SampleDataActionTypes.ADD_DATA_FAIL)
      .pipe(switchMap(() => response));
    expect(effect$).toBeObservable(expected);
  });
  // describe('DeleteData Effects Details', () => {
  //   describe('DeleteData', () => {
  //     it('DeleteData Effects should work also', () => {
  //       const action: any  = { type: AuthActionTypes.DELETE_DATA };
  //       const response: any  = cold('-b', { b: true });
  //       const expected: any  = cold('--c', { c: true });
  //       const effect$: any = new Actions(hot('-a', { a: action }))
  //         .ofType(AuthActionTypes.DELETE_DATA)
  //         .pipe(switchMap(() => response));
  //       expect(effect$).toBeObservable(expected);
  //     });
  //   });
  //   it('DeleteDataSuccess effect should work', () => {
  //     actions = new ReplaySubject(1);
  //     actions.next(DeleteData);
  //     effects.deleteData.subscribe((result: any)  => {
  //       expect(result).toEqual(DeleteDataSuccess);
  //     });
  //     expect().nothing();
  //   });
  //   it('DeleteDataFail effect should work also', () => {

  //     const payload: any  = {
  //       name: 'TESTNAME',
  //       surname: 'TESTSURNAME',
  //       email: 'TESTEMAIL',
  //       age: 12,
  //     };
  //     actions = new ReplaySubject(1); // = Observable + Observer, 1 = buffer size
  //     actions.next(new DeleteData(payload));
  //     effects.deleteData.subscribe((result: any ) => {
  //       expect(result).toEqual(new DeleteDataFail(payload));
  //     });
  //   });
  // });
});
