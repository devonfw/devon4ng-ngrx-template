import { generateUser } from '../../models/datadetailstest.model';
import * as fromSampleDataActions from './sampledata.actions';

describe('SampleDataActionTestCase', () => {
  describe('Add Data Details', () => {
    describe('CreateData', () => {
      it('should create an action', () => {
        const payload: any = {
          name: 'TESTNAME',
          surname: 'TESTSURNAME',
          email: 'TESTMAIL',
          age: 12,
        };
        const action = fromSampleDataActions.createData(payload);
        expect({ ...(action as any) }).toEqual({
          type: '[SampleData] CreateData',
          searchCriteriaDataModel: payload,
        });
      });
    });
    describe('CreateDatafail', () => {
      it('should create an action', () => {
        const error: Error = new Error();
        const action = fromSampleDataActions.createDataFail({ error });
        const payload = { error: error };
        expect({ ...(action as any) }).toEqual({
          type: '[SampleData] CreateDataFail',
          error: Object(payload),
        });
      });
    });
    describe('CreateDataSuccess', () => {
      it('should create an action', () => {
        const payload: any = {
          name: 'TESTNAME',
          surname: 'TESTSURNAME',
          email: 'TESTMAIL',
          age: 12,
        };
        const action = fromSampleDataActions.createDataSuccess(payload);
        expect({ ...action }).toEqual({
          type: '[SampleData] CreateDataSuccess',
          searchCriteriaDataModel: Object(payload),
        });
      });
    });
  });
  describe('Edit Data Details', () => {
    describe('UpdateData', () => {
      it('should create an action', () => {
        const payload = generateUser();
        const action: any = fromSampleDataActions.updateData(payload);
        expect({ ...action }).toEqual({
          type: '[SampleData] UpdateData',
          searchCriteriaDataModel: Object(payload),
        });
      });
    });
    describe('UpdateDatafail', () => {
      it('should create an action', () => {
        const error: Error = new Error();
        const action = fromSampleDataActions.updateDataFail({ error });
        expect({ ...(action as any) }).toEqual({
          type: '[SampleData] UpdateDataFail',
          error,
        });
      });
    });
    describe('UpdateDataSuccess', () => {
      it('should create an action', () => {
        const payload = generateUser();
        const action = fromSampleDataActions.updateDataSuccess(payload);
        expect({ ...(action as any) }).toEqual({
          type: '[SampleData] UpdateDataSuccess',
          criteria: {},
          data: Object({ ...payload }),
        });
      });
    });
  });
  describe('Delete Data Details', () => {
    describe('DeleteData', () => {
      it('should create an action', () => {
        const payload = generateUser();
        const action: any = fromSampleDataActions.deleteData(payload);
        expect({ ...action }).toEqual({
          type: '[SampleData] DeleteData',
          searchCriteriaDataModel: Object(payload),
        });
      });
    });
    describe('DeleteDataFail', () => {
      it('should create an action', () => {
        const error: Error = new Error();
        const action = fromSampleDataActions.deleteDataFail({ error });
        expect({ ...(action as any) }).toEqual({
          type: '[SampleData] DeleteDataFail',
          error,
        });
      });
    });
    describe('DeleteDataSuccess', () => {
      it('should create an action', () => {
        const payload = generateUser();
        const action = fromSampleDataActions.deleteDataSuccess(payload);
        expect({ ...(action as any) }).toEqual({
          type: '[SampleData] DeleteSuccess',
          searchCriteriaDataMode: Object({ payload }),
        });
      });
    });
  });
});
