import {
  generateUser,
  generateUserUpdate,
} from '../../models/datadetailstest.model';
import * as sampleDataActions from './sampledata.actions';

describe('SampleDataActionTestCase', () => {
  describe('Add Data Details', () => {
    describe('CreateData', () => {
      it('should create an action', () => {
        const payload = {
          criteria: {},
          data: {
            name: 'TESTNAME',
            surname: 'TESTSURNAME',
            email: 'TESTMAIL',
            age: 12,
          },
        };
        const action = sampleDataActions.createData({
          searchCriteriaDataModel: payload,
        });
        expect({ ...action }).toEqual({
          type: '[SampleData] CreateData',
          searchCriteriaDataModel: payload,
        });
      });
    });
    describe('CreateDatafail', () => {
      it('should create an action', () => {
        const error: Error = new Error();
        const action = sampleDataActions.createDataFail({ error });
        expect({ ...action }).toEqual({
          type: '[SampleData] CreateDataFail',
          error,
        });
      });
    });
    describe('CreateDataSuccess', () => {
      it('should create an action', () => {
        const payload = {
          criteria: {},
          data: {
            name: 'TESTNAME',
            surname: 'TESTSURNAME',
            email: 'TESTMAIL',
            age: 12,
          },
        };
        const action = sampleDataActions.createDataSuccess({
          searchCriteriaDataModel: payload,
        });
        expect({ ...action }).toEqual({
          type: '[SampleData] CreateDataSuccess',
          searchCriteriaDataModel: payload,
        });
      });
    });
  });
  describe('Edit Data Details', () => {
    describe('UpdateData', () => {
      it('should create an action', () => {
        const payload = {
          criteria: {},
          data: generateUser(),
        };
        const action = sampleDataActions.updateData({
          searchCriteriaDataModel: payload,
        });
        expect({ ...action }).toEqual({
          type: '[SampleData] UpdateData',
          searchCriteriaDataModel: payload,
        });
      });
    });
    describe('UpdateDatafail', () => {
      it('should create an action', () => {
        const error: Error = new Error();
        const action = sampleDataActions.updateDataFail({ error });
        expect({ ...action }).toEqual({
          type: '[SampleData] UpdateDataFail',
          error,
        });
      });
    });
    describe('UpdateDataSuccess', () => {
      it('should create an action', () => {
        const payload = {
          criteria: {},
          data: generateUserUpdate(),
        };
        const action = sampleDataActions.updateDataSuccess(payload);
        expect({ ...action }).toEqual({
          type: '[SampleData] UpdateDataSuccess',
          ...payload,
        });
      });
    });
  });
  describe('Delete Data Details', () => {
    describe('DeleteData', () => {
      it('should create an action', () => {
        const payload = {
          criteria: {},
          data: generateUser(),
        };
        const action = sampleDataActions.deleteData({
          searchCriteriaDataModel: payload,
        });
        expect({ ...action }).toEqual({
          type: '[SampleData] DeleteData',
          searchCriteriaDataModel: payload,
        });
      });
    });
    describe('DeleteDataFail', () => {
      it('should create an action', () => {
        const error: Error = new Error();
        const action = sampleDataActions.deleteDataFail({ error });
        expect({ ...action }).toEqual({
          type: '[SampleData] DeleteDataFail',
          error,
        });
      });
    });
    describe('DeleteDataSuccess', () => {
      it('should create an action', () => {
        const payload = {
          criteria: {},
          data: generateUser(),
        };
        const action = sampleDataActions.deleteDataSuccess({
          searchCriteriaDataModel: payload,
        });
        expect({ ...action }).toEqual({
          type: '[SampleData] DeleteSuccess',
          searchCriteriaDataModel: payload,
        });
      });
    });
  });
});
