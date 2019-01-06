import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { SampleDataService } from '../../services/sampledata.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import {
  SampleDataActionTypes,
  DeleteData,
  DeleteDataSuccess,
  DeleteDataFail,
} from '../actions/sampledata.actions';
import { SampleDataEffects } from './sampledata.effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { hot, cold } from 'jasmine-marbles';
import { CoreModule } from '../../../core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { Actions } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AddData, AddDataSuccess } from '../actions/sampledata.actions';

describe('SampleDataffectsTestCase', () => {
  const params: any = new BehaviorSubject({});
  let actions: Observable<any>;
  let effects: SampleDataEffects;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
  });
  describe('SampleDataEffectsTestCase', () => {
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

      it('AddDataSuccess Effects should work also', () => {
        const action: any = { type: SampleDataActionTypes.ADD_DATA_SUCCESS };
        const response: any = cold('-b', { b: true });
        const expected: any = cold('--c', { c: true });
        const effect$: any = new Actions(hot('-a', { a: action }))
          .ofType(SampleDataActionTypes.ADD_DATA_SUCCESS)
          .pipe(switchMap(() => response));
        expect(effect$).toBeObservable(expected);
      });
    });
    it('AddDatafail Effects should work also ', () => {
      const action: any = { type: SampleDataActionTypes.ADD_DATA_FAIL };
      const response: any = cold('-b', { b: true });
      const expected: any = cold('--c', { c: true });
      const effect$: any = new Actions(hot('-a', { a: action }))
        .ofType(SampleDataActionTypes.ADD_DATA_FAIL)
        .pipe(switchMap(() => response));
      expect(effect$).toBeObservable(expected);
    });
  });
  describe('DeleteData Effects Details', () => {
    describe('DeleteData', () => {
      it('DeleteData Effects should work also', () => {
        const action: any = { type: SampleDataActionTypes.DELETE_DATA };
        const response: any = cold('-b', { b: true });
        const expected: any = cold('--c', { c: true });
        const effect$: any = new Actions(hot('-a', { a: action }))
          .ofType(SampleDataActionTypes.DELETE_DATA)
          .pipe(switchMap(() => response));
        expect(effect$).toBeObservable(expected);
      });
    });
  });
});
