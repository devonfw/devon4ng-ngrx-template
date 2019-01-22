import { Sampledata } from '../../models/sampledata.model';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { SampleDataActionTypes, All } from '../actions/sampledata.actions';
export const sampledataAdapter: any = createEntityAdapter<Sampledata>();
export interface State extends EntityState<Sampledata> {
  currentContactId?: number;
}
export interface State {
  isAuthenticated: boolean;
  user: Sampledata | null;
  errorMessage: string | null;
  successmassage: string | null;
  text: string | null;
}
export const initialState: State = sampledataAdapter.getInitialState({
  isAuthenticated: false,
  user: undefined,
  errorMessage: undefined,
  text: undefined,
  successmassage: undefined,
});
export function reducer(state: State = initialState, action: All): State {
  switch (action.type) {
    case SampleDataActionTypes.LOAD_DATA_SUCCESS: {
      return {
        ...state,
        successmassage: 'successfully loaded',
      };
    }
    case SampleDataActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          username: action.payload.username,
          password: action.payload.password,
        },
        errorMessage: '',
        successmassage: 'login Successfully',
      };
    }
    case SampleDataActionTypes.LOGOUT: {
      return initialState;
    }
    case SampleDataActionTypes.LOGIN_FAIL: {
      return {
        ...state,
        errorMessage: 'Incorrect username and/or password.',
      };
    }
    case SampleDataActionTypes.ADD_DATA_SUCCESS: {
      return {
        ...state,
        user: {
          name: action.payload.name,
          surname: action.payload.surname,
          mail: action.payload.mail,
          age: action.payload.age,
        },
        errorMessage: 'No error',
      };
    }
    case SampleDataActionTypes.EDIT_DATA_SUCCESS: {
      return {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          surname: action.payload.surname,
          mail: action.payload.mail,
          age: action.payload.age,
        },
      };
    }
    case SampleDataActionTypes.SEARCH_DATA_SUCCESS: {
      return {
        ...state,
        successmassage: 'successfully Search',
      };
    }
    case SampleDataActionTypes.DELETE_DATA_SUCCESS: {
      return {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          surname: action.payload.surname,
          mail: action.payload.mail,
          age: action.payload.age,
        },
        successmassage: 'successfully Remove Data',
      };
    }
    default: {
      return state;
    }
  }
}
export const getCurrentContactId: any = (state: State) =>
  state.currentContactId;
