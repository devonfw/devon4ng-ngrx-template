import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import {
  generateUser,
  generateUserUpdate,
} from '../../models/datadetailstest.model';
import { SampleDataService } from '../../services/sampledata.service';
import * as sampleDataActions from '../actions/sampledata.actions';
import { SampleDataEffects } from './sampledata.effects';

describe('SampleDataffects', () => {
  let actions$: Observable<Action>;
  let effects: SampleDataEffects;
  let sampleDataService: any;
  let saveSampleDataSpy: any;
  let getSampleDataSpy: any;
  let editSampleDataSpy: any;
  let deleteSampleDataSpy: any;

  beforeEach(() => {
    sampleDataService = jasmine.createSpyObj('SampleDataService', [
      'saveSampleData',
      'getSampleData',
      'editSampleData',
      'deleteSampleData',
    ]);
    saveSampleDataSpy = sampleDataService.saveSampleData.and.returnValue(
      of(generateUser()),
    );
    getSampleDataSpy = sampleDataService.getSampleData.and.returnValue(
      of({ content: [generateUser()], totalElements: 1 }),
    );
    editSampleDataSpy = sampleDataService.editSampleData.and.returnValue(
      of(generateUser()),
    );
    deleteSampleDataSpy = sampleDataService.deleteSampleData.and.returnValue(
      of(generateUser()),
    );

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        SampleDataEffects,
        {
          provide: SampleDataService,
          useValue: sampleDataService,
        },
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject<SampleDataEffects>(SampleDataEffects);
  });

  describe('SampleData Effects', () => {
    describe('loadData', () => {
      it('Success', () => {
        const action = sampleDataActions.loadData({
          sampleDataModel: generateUser(),
        });
        const completion = sampleDataActions.loadDataSuccess({
          httpResponseModel: { content: [generateUser()], totalElements: 1 },
        });

        actions$ = hot('-a-', {
          a: action,
        });
        const response = cold('-b', {
          b: {
            content: [generateUser()],
            totalElements: 1,
          },
        });
        const expected = cold('--c', { c: completion });

        getSampleDataSpy.and.returnValue(response);
        expect(effects.loadData$).toBeObservable(expected);
      });
    });

    describe('createData', () => {
      it('Success', () => {
        const action = sampleDataActions.createData({
          searchCriteriaDataModel: { criteria: {}, data: generateUser() },
        });
        const completion = sampleDataActions.createDataSuccess({
          searchCriteriaDataModel: { criteria: {}, data: generateUser() },
        });

        actions$ = hot('-a-', {
          a: action,
        });
        const response = cold('-b', { b: generateUser() });
        const expected = cold('--c', { c: completion });

        saveSampleDataSpy.and.returnValue(response);
        expect(effects.createData$).toBeObservable(expected);
      });
    });

    describe('updateData', () => {
      it('Success', () => {
        const action = sampleDataActions.updateData({
          searchCriteriaDataModel: { criteria: {}, data: generateUser() },
        });
        const completion = sampleDataActions.updateDataSuccess({
          criteria: {},
          data: generateUserUpdate(),
        });

        actions$ = hot('-a-', {
          a: action,
        });
        const response = cold('-b', { b: generateUser() });
        const expected = cold('--c', { c: completion });

        editSampleDataSpy.and.returnValue(response);
        expect(effects.updateData$).toBeObservable(expected);
      });
    });

    describe('deleteData', () => {
      it('Success', () => {
        const action = sampleDataActions.deleteData({
          searchCriteriaDataModel: { criteria: {}, data: generateUser() },
        });
        const completion = sampleDataActions.deleteDataSuccess({
          searchCriteriaDataModel: { criteria: {}, data: generateUser() },
        });

        actions$ = hot('-a-', {
          a: action,
        });
        const response = cold('-b', { b: generateUser() });
        const expected = cold('--c', { c: completion });

        deleteSampleDataSpy.and.returnValue(response);
        expect(effects.deleteData$).toBeObservable(expected);
      });
    });
  });
});
