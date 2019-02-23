import * as froasptempletes from './sampledata.actions';
import { generateUser } from '../../models/datadetailstest.model';
import {
  SampleDataActionTypes,
  AddData,
  EditData,
  DeleteData,
} from './sampledata.actions';
describe('SampleDataActionTestCase', () => {
  describe('Add Data Details', () => {
    describe('AddData', () => {
      it('should create an action', () => {
        const payload: any = {
          name: 'TESTNAME',
          surname: 'TESTSURNAME',
          mail: 'TESTmail',
          age: 12,
        };
        const action: any = new AddData(payload);
        expect({ ...action }).toEqual({
          type: SampleDataActionTypes.ADD_DATA,
          payload,
        });
      });
    });
    describe('AddDatafail', () => {
      it('should create an action', () => {
        const error: Error = new Error();
        const action: any = new froasptempletes.AddDataFail({ error });
        const payload: any = { error: error };
        expect({ ...action }).toEqual({
          type: SampleDataActionTypes.ADD_DATA_FAIL,
          payload,
        });
      });
    });
    describe('AddDataSuccess', () => {
      it('should create an action', () => {
        const payload: any = {
          name: 'TESTNAME',
          surname: 'TESTSURNAME',
          mail: 'TESTmail',
          age: 12,
        };
        const action: any = new froasptempletes.AddDataSuccess(payload);
        expect({ ...action }).toEqual({
          type: SampleDataActionTypes.ADD_DATA_SUCCESS,
          payload,
        });
      });
    });
  });
  describe('Edit Data Details', () => {
    describe('EditData', () => {
      it('should create an action', () => {
        const payload: any = generateUser();
        const action: any = new EditData(payload);
        expect({ ...action }).toEqual({
          type: SampleDataActionTypes.EDIT_DATA,
          payload,
        });
      });
    });
    describe('EditDatafail', () => {
      it('should create an action', () => {
        const error: Error = new Error();
        const action: any = new froasptempletes.EditDataFail({ error });
        const payload: any = { error: error };
        expect({ ...action }).toEqual({
          type: SampleDataActionTypes.EDIT_DATA_FAIL,
          payload,
        });
      });
    });
    describe('EditDataSuccess', () => {
      it('should create an action', () => {
        const payload: any = generateUser();
        const action: any = new froasptempletes.EditDataSuccess(payload);
        expect({ ...action }).toEqual({
          type: SampleDataActionTypes.EDIT_DATA_SUCCESS,
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
