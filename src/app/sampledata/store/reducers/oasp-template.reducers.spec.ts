import * as fromMyReducers from './oasp-template.reducers';
import * as froasptempletesaction from '../actions/oasp-templetes.actions';
import { Login } from '../../models/login.model';
import { generateUser } from '../../models/login.model';

  describe('Add Action  Reducer', () => {
   it('should return the default state', () => {
      const { initialState } = fromMyReducers;
      const action = {} as any;
      const state = fromMyReducers.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });
  it('should add the New Details in array', () => {
    const Login = [
      {
        name: '',
        surname: ''
        , email: '',
        age: ''
      }
    ];
    const Detailsdata: Login = {
      name: 'AMIDDT',
      surname: 'dubddey'
      , email: 'test',
      age: 12,
    };
    const { initialState } = fromMyReducers;
    const previousState = { ...initialState };
    const action = new froasptempletesaction.AddDataSuccess(Detailsdata);
    const state = fromMyReducers.reducer(previousState, action);
    expect(state.user).toEqual(Detailsdata);
  });
describe('Edit Action Reducer ', () => {
      it('should return the default state', () => {
      const { initialState } = fromMyReducers;
      const action = {} as any;
      const state = fromMyReducers.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });
  it('should Edit Details in array', () => {
    const Login = [
      {
        name: '',
        surname: ''
        , email: '',
        age: ''
      }
    ]; 
    const Detailsdata = generateUser();
    const { initialState } = fromMyReducers;
    const previousState = { ...initialState };
    const action = new froasptempletesaction.EditDataSuccess(Detailsdata);
    const state = fromMyReducers.reducer(previousState, action);
    expect(state.user).toEqual(Detailsdata);
  });
  describe('Remove Action Reducer ', () => {
    it('should return the default state', () => {
      const { initialState } = fromMyReducers;
      const action = {} as any;
      const state = fromMyReducers.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });
  it('should Remove the Detils from array', () => {
    const Login = [
      {
        name: '',
        surname: ''
        , email: '',
        age: ''
      }
    ];
    const Detailsdata = generateUser();
    const { initialState } = fromMyReducers;
    const previousState = { ...initialState };
    const action = new froasptempletesaction.DeleteDataSuccess(Detailsdata);
    const state = fromMyReducers.reducer(previousState, action);
  expect(state.user).toEqual(Detailsdata);
});