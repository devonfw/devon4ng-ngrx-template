      import * as froasptempletes from './oasp-templetes.actions';
      import { generateUser } from '../../models/login.model';
      import {
        AuthActionTypes,
        AddData,
        EditData,
        DeleteData
      } from '../actions/oasp-templetes.actions';
      
      describe('Add Data Details', () => {
          describe('AddData', () => {
            it('should create an action', () => {
              const payload = {
                    name: 'TESTNAME',
                    surname: 'TESTSURNAME',
                    email: 'TESTEMAIL',
                    age: 12};
              const action = new AddData(payload);
              expect({ ...action }).toEqual({
                type: AuthActionTypes.ADD_DATA,payload,
              });
            });
          });
          describe('AddDatafail', () => {
            it('should create an action', () => {
              const error = new Error();
              const action = new froasptempletes.AddDatafail({error});
              const payload={error}
              expect({ ...action }).toEqual({
                type: AuthActionTypes.ADD_DATA_FAIL,
                payload,
              });
            });
          });
          describe('AddDataSuccess', () => {
            it('should create an action', () => {
              const payload = {
                    name: 'TESTNAME',
                    surname: 'TESTSURNAME',
                    email: 'TESTEMAIL',
                    age: 12};
              const action = new froasptempletes.AddDataSuccess(payload);
              expect({ ...action }).toEqual({
                type: AuthActionTypes.ADD_DATA_SUCCESS,
                payload,
              });
            });
          });
        });
      describe('Edit Data Details', () => {
          describe('EditData', () => {
            it('should create an action', () => {
                  const payload = generateUser();
                  const action = new EditData(payload);
                  expect({ ...action }).toEqual({
                    type: AuthActionTypes.EDIT_DATA,payload,
                  });
                });
        });
        describe('EditDatafail', () => {
          it('should create an action', () => {
                const error = new Error();
                const action = new froasptempletes.EditDataFail({error});
                const payload={error}
                expect({ ...action }).toEqual({
                  type: AuthActionTypes.EDIT_DATA_FAIL,
                  payload,
                });
              }); 
        });
        describe('EditDataSuccess', () => {
          it('should create an action', () => {
            const payload = generateUser();
            const action = new froasptempletes.EditDataSuccess(payload);
            expect({ ...action }).toEqual({
              type: AuthActionTypes.EDIT_DATA_SUCCESS,
              payload,
            });
          });
        });
      });
      describe('Remove Data Details', () => {
          describe('RemoveData', () => {
            it('should create an action', () => {
                const payload = generateUser();
                const action = new DeleteData(payload);
                expect({ ...action }).toEqual({
                  type: AuthActionTypes.DELETE_DATA,payload,
                });
              });
        });
        describe('RemoveDataFail', () => {
          it('should create an action', () => {
                const error = new Error();
                const action = new froasptempletes.DeleteDataFail({error});
                const payload={error}
                expect({ ...action }).toEqual({
                  type: AuthActionTypes.DELETE_DATA_FAIL,
                  payload,
                });
              }); 
        });
        describe('RemoveDataSuccess', () => {
          it('should create an action', () => {
            const payload = generateUser(); 
                const action = new froasptempletes.DeleteDataSuccess(payload);
                expect({ ...action }).toEqual({
                  type: AuthActionTypes.DELETE_DATA_SUCCESS,
                  payload,
                });
              });
        });
      }); 