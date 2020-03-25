import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { generateUser } from '../../models/datadetailstest.model';
import { SampleDataService } from '../../services/sampledata.service';
import * as sampleDataActions from '../actions/sampledata.actions';
import { SampleDataEffects } from './sampledata.effects';

describe('SampleDataffects', () => {
  let actions$: Observable<Action>;
  let effects: SampleDataEffects;
  let sampleDataService: any;
  let saveSampleDataSpy: any;

  beforeEach(() => {
    sampleDataService = jasmine.createSpyObj('SampleDataService', [
      'saveSampleData',
    ]);
    saveSampleDataSpy = sampleDataService.saveSampleData.and.returnValue(
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
    // describe('loadData', () => {});

    describe('createData', () => {
      it('CreateData Effects should work also', () => {
        const action = sampleDataActions.createData({
          searchCriteriaDataModel: { criteria: {}, data: generateUser() },
        });
        const completion = sampleDataActions.createDataSuccess({
          searchCriteriaDataModel: { criteria: {}, data: generateUser() },
        });

        actions$ = hot('-a--', {
          a: action,
        });
        const response = cold('-b', { b: generateUser() });
        const expected = cold('--c', { c: completion });

        saveSampleDataSpy.and.returnValue(response);
        expect(effects.createData$).toBeObservable(expected);
      });
    });

    // describe('updateData', () => {});

    // describe('deleteData', () => {});
  });
});
