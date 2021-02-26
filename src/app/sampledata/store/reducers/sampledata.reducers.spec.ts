import * as fromMyReducers from './sampledata.reducers';
import * as froasptempletesaction from '../actions/sampledata.actions';
import { SearchCriteriaDataModel } from '../../models/searchcriteriadata.model';
import { Update } from '@ngrx/entity';
import { SampleDataModel } from '../../models/sampledata.model';

const TEST_ID = 0;
const detailsdata: SearchCriteriaDataModel = {
  criteria: {},
  data: {
    id: TEST_ID,
    name: 'TESTNAME',
    surname: 'TESTSURNAME',
    email: 'TESTMAIL',
    age: 12,
  },
};

describe('SampleDataReducersTestCase', () => {
  describe('Add Action  Reducer', () => {
    it('should return the default state', () => {
      const { initialState } = fromMyReducers;
      const action: any = {} as any;
      const state: any = fromMyReducers.reducer(undefined, action);
      expect(state).toBe(initialState);
    });

    it('should add the New Details in array', () => {
      const { initialState } = fromMyReducers;
      const previousState: any = { ...initialState };
      const action: any = froasptempletesaction.createDataSuccess({
        searchCriteriaDataModel: detailsdata,
      });
      const state: fromMyReducers.SampleDataState = fromMyReducers.reducer(
        previousState,
        action,
      );

      expect(state.entities[TEST_ID]).toEqual(detailsdata.data);
    });
  });
  describe('Edit Action Reducer ', () => {
    it('should return the default state', () => {
      const { initialState } = fromMyReducers;
      const action: any = {} as any;
      const state: any = fromMyReducers.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
    it('should Edit Details in array', () => {
      // Add entity
      const { initialState } = fromMyReducers;
      const action: any = froasptempletesaction.createDataSuccess({
        searchCriteriaDataModel: detailsdata,
      });
      const state: fromMyReducers.SampleDataState = fromMyReducers.reducer(
        { ...initialState },
        action,
      );

      // Defiene changes
      const update: Update<SampleDataModel> = {
        id: TEST_ID,
        changes: {
          id: TEST_ID,
          name: 'TESTNAME2',
          surname: 'TESTSURNAME2',
          email: 'TESTMAIL2',
        },
      };

      const edit = {
        criteria: {},
        data: update,
      };

      // Update added entity
      const afterAddState: fromMyReducers.SampleDataState = { ...state };
      const actionUpdate = froasptempletesaction.updateDataSuccess(edit);
      const stateUpdated: fromMyReducers.SampleDataState = fromMyReducers.reducer(
        afterAddState,
        actionUpdate,
      );

      expect(stateUpdated.entities[TEST_ID].name).toEqual(update.changes.name);
      expect(stateUpdated.entities[TEST_ID].surname).toEqual(
        update.changes.surname,
      );
      expect(stateUpdated.entities[TEST_ID].email).toEqual(
        update.changes.email,
      );
    });
  });
  describe('Remove Action Reducer ', () => {
    it('should return the default state', () => {
      const { initialState } = fromMyReducers;
      const action: any = {} as any;
      const state: any = fromMyReducers.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
    it('should Remove the Details from array', () => {
      // Add entity
      const { initialState } = fromMyReducers;
      const action: any = froasptempletesaction.createDataSuccess({
        searchCriteriaDataModel: detailsdata,
      });
      const state: fromMyReducers.SampleDataState = fromMyReducers.reducer(
        { ...initialState },
        action,
      );

      // Delete added entity
      const textMessage: any = 'delete Data Success';
      const afterAddState: any = { ...state };
      const actionDelete: any = froasptempletesaction.deleteDataSuccess({
        searchCriteriaDataModel: detailsdata,
      });
      const stateDeleted: any = fromMyReducers.reducer(
        afterAddState,
        actionDelete,
      );

      expect(stateDeleted.textMessage).toEqual(textMessage);
    });
  });
});
