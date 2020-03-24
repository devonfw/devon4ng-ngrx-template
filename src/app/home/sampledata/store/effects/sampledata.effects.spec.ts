import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { SampleDataService } from '../../services/sampledata.service';
import * as sampleDataActions from '../actions/sampledata.actions';
import { SampleDataEffects } from './sampledata.effects';

describe('SampleDataffects', () => {
  let actions$: Observable<Action>;
  const effects = TestBed.inject<SampleDataEffects>(SampleDataEffects);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        SampleDataService,
        SampleDataEffects,
        provideMockActions(() => actions$),
      ],
    });
  });

  describe('SampleData Effects', () => {
    describe('loadData', () => {});

    describe('createData', () => {
      it('CreateData Effects should work also', () => {
        const action = sampleDataActions.createData({
          searchCriteriaDataModel: { criteria: {}, data: {} },
        });

        actions$ = hot('-a--', {
          a: { type: '[SampleData] CreateData' },
        });

        expect(effects.createData$).toBeObservable(actions$);
      });
    });

    describe('updateData', () => {});

    describe('deleteData', () => {});
  });
});
