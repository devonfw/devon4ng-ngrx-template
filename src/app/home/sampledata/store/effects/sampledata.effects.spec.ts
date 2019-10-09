import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { SampleDataService } from '../../services/sampledata.service';
import { Observable } from 'rxjs';
import { SampleDataActionTypes } from '../actions/sampledata.actions';
import { SampleDataEffects } from './sampledata.effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { hot, cold } from 'jasmine-marbles';
import { CoreModule } from '../../../../core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { Actions, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

describe('SampleDataffectsTestCase', () => {
  let actions: Observable<any>;
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
    describe('CreateData', () => {
      it('CreateData Effects should work also', () => {
        const action: any = { type: SampleDataActionTypes.CREATE_DATA };
        const response: any = cold('-b', { b: true });
        const expected: any = cold('--c', { c: true });
        const effect$: any = new Actions(hot('-a', { a: action }))
          .pipe(ofType(SampleDataActionTypes.CREATE_DATA))
          .pipe(switchMap(() => response));
        expect(effect$).toBeObservable(expected);
      });

      it('CreateDataSuccess Effects should work also', () => {
        const action: any = { type: SampleDataActionTypes.CREATE_DATA_SUCCESS };
        const response: any = cold('-b', { b: true });
        const expected: any = cold('--c', { c: true });
        const effect$: any = new Actions(hot('-a', { a: action }))
          .pipe(ofType(SampleDataActionTypes.CREATE_DATA_SUCCESS))
          .pipe(switchMap(() => response));
        expect(effect$).toBeObservable(expected);
      });
    });
    it('CreateDatafail Effects should work also ', () => {
      const action: any = { type: SampleDataActionTypes.CREATE_DATA_FAIL };
      const response: any = cold('-b', { b: true });
      const expected: any = cold('--c', { c: true });
      const effect$: any = new Actions(hot('-a', { a: action }))
        .pipe(ofType(SampleDataActionTypes.CREATE_DATA_FAIL))
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
          .pipe(ofType(SampleDataActionTypes.DELETE_DATA))
          .pipe(switchMap(() => response));
        expect(effect$).toBeObservable(expected);
      });
    });
  });
});
