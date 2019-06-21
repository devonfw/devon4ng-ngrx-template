import * as froasptempletes from './sampledata.actions';
import { generateUser } from '../../models/datadetailstest.model';
import {
  SampleDataActionTypes,
  CreateData,
  UpdateData,
  DeleteData,
} from './sampledata.actions';
describe('SampleDataActionTestCase', () => {
  describe('Add Data Details', () => {
    describe('CreateData', () => {
      it('should create an action', () => {
        const payload: any = {
          name: 'TESTNAME',
          surname: 'TESTSURNAME',
          mail: 'TESTMAIL',
          age: 12,
        };
        const action: any = new CreateData(payload);
        expect({ ...action }).toEqual({
          type: SampleDataActionTypes.CREATE_DATA,
          payload,
        });
      });
    });
    describe('CreateDatafail', () => {
      it('should create an action', () => {
        const error: Error = new Error();
        const action: any = new froasptempletes.CreateDataFail({ error });
        const payload: any = { error: error };
        expect({ ...action }).toEqual({
          type: SampleDataActionTypes.CREATE_DATA_FAIL,
          payload,
        });
      });
    });
    describe('CreateDataSuccess', () => {
      it('should create an action', () => {
        const payload: any = {
          name: 'TESTNAME',
          surname: 'TESTSURNAME',
          mail: 'TESTMAIL',
          age: 12,
        };
        const action: any = new froasptempletes.CreateDataSuccess(payload);
        expect({ ...action }).toEqual({
          type: SampleDataActionTypes.CREATE_DATA_SUCCESS,
          payload,
        });
      });
    });
  });
  describe('Edit Data Details', () => {
    describe('UpdateData', () => {
      it('should create an action', () => {
        const payload: any = generateUser();
        const action: any = new UpdateData(payload);
        expect({ ...action }).toEqual({
          type: SampleDataActionTypes.UPDATE_DATA,
          payload,
        });
      });
    });
    describe('UpdateDatafail', () => {
      it('should create an action', () => {
        const error: Error = new Error();
        const action: any = new froasptempletes.UpdateDataFail({ error });
        const payload: any = { error: error };
        expect({ ...action }).toEqual({
          type: SampleDataActionTypes.UPDATE_DATA_FAIL,
          payload,
        });
      });
    });
    describe('UpdateDataSuccess', () => {
      it('should create an action', () => {
        const payload: any = generateUser();
        const action: any = new froasptempletes.UpdateDataSuccess(payload);
        expect({ ...action }).toEqual({
          type: SampleDataActionTypes.UPDATE_DATA_SUCCESS,
          payload,
        });
      });
    });
  });
  describe('Remove Data Details', () => {
    describe('RemoveData', () => {
      it('should create an action', () => {
        const payload: any = generateUser();
        const action: any = new DeleteData(payload);
        expect({ ...action }).toEqual({
          type: SampleDataActionTypes.DELETE_DATA,
          payload,
        });
      });
    });
    describe('RemoveDataFail', () => {
      it('should create an action', () => {
        const error: Error = new Error();
        const action: any = new froasptempletes.DeleteDataFail({ error });
        const payload: any = { error: error };
        expect({ ...action }).toEqual({
          type: SampleDataActionTypes.DELETE_DATA_FAIL,
          payload,
        });
      });
    });
    describe('RemoveDataSuccess', () => {
      it('should create an action', () => {
        const payload: any = generateUser();
        const action: any = new froasptempletes.DeleteDataSuccess(payload);
        expect({ ...action }).toEqual({
          type: SampleDataActionTypes.DELETE_DATA_SUCCESS,
          payload,
        });
      });
    });
  });
});
