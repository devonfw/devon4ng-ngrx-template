import * as fromMyReducers from './sampledata.reducers';
import * as froasptempletesaction from '../actions/sampledata.actions';
import { SampledataModel } from '../../models/sampledata.model';
import { generateUser } from '../../models/datadetailstest.model';
describe('SampleDataReducersTestCase', () => {
  describe('Add Action  Reducer', () => {
    it('should return the default state', () => {
      const { initialState } = fromMyReducers;
      const action: any = {} as any;
      const state: any = fromMyReducers.reducer(undefined, action);
      expect(state).toBe(initialState);
    });

    it('should add the New Details in array', () => {
      const detailsdata: SampledataModel = {
        name: 'TESTNAME',
        surname: 'TESTSURNAME',
        mail: 'TESTmail',
        age: 12,
      };
      const { initialState } = fromMyReducers;
      const previousState: any = { ...initialState };
      const action: any = new froasptempletesaction.AddDataSuccess(detailsdata);
      const state: any = fromMyReducers.reducer(previousState, action);
      expect(state.user).toEqual(detailsdata);
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
      const detailsdata: any = generateUser();
      const { initialState } = fromMyReducers;
      const previousState: any = { ...initialState };
      const action: any = new froasptempletesaction.EditDataSuccess(
        detailsdata,
      );
      const state: any = fromMyReducers.reducer(previousState, action);
      expect(state.user).toEqual(detailsdata);
    });
  });
  describe('Remove Action Reducer ', () => {
    it('should return the default state', () => {
      const { initialState } = fromMyReducers;
      const action: any = {} as any;
      const state: any = fromMyReducers.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
    it('should Remove the Detils from array', () => {
      const detailsdata: any = generateUser();
      const { initialState } = fromMyReducers;
      const previousState: any = { ...initialState };
      const action: any = new froasptempletesaction.DeleteDataSuccess(
        detailsdata,
      );
      const state: any = fromMyReducers.reducer(previousState, action);
      expect(state.user).toEqual(detailsdata);
    });
  });
});
