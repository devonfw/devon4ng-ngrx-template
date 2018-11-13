import { Login } from '../../../sampledata/models/login.model';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { AuthActionTypes, All } from '../actions/oasp-templetes.actions';
debugger;

export const sampledataAdapter = createEntityAdapter<Login>(

  
);


export interface State extends EntityState<Login> {
  currentContactId?: number;
}
 export interface State {
  currentContactId?: number;
   isAuthenticated: boolean;
   user: Login | null;
   errorMessage: string | null;
   text: string | null;
 }
 export const initialState: State = sampledataAdapter.getInitialState({
  currentContactId: undefined,
  isAuthenticated: false,
   user: null,
   errorMessage: null,
   text: null
});

//  export const initialState: State = {
//    isAuthenticated: false,
//    user: null,
//    errorMessage: null,
//    text: null
//  };
 //debugger;
// interface ApplicationState {
//   currentlyLoading: boolean;
// customerList: any []
// }
// export const initialState: ApplicationState = {
//   currentlyLoading: false,
// customerList: []
// };

const newState = (state, newData) => {
  return Object.assign({}, state, newData)
}

export function reducer(state: State = initialState, action: All) : State {
  
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
         username: action.payload.username,
         password: action.payload.password
         },
         errorMessage: '',
         text: 'login Successfully'

      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      //debugger;
      return {
        ...state,
        errorMessage: 'Incorrect username and/or password.'
      };
    }
    case AuthActionTypes.ADD_DATA_SUCCESS: {
      //debugger;
      return newState(state, { text: action.payload });
    }
    case AuthActionTypes.EDIT_DATA_SUCCESS: {
      //debugger;
      return {...state,user: 
            {name: action.payload.name,
           surname: action.payload.surname,
           email: action.payload.email,
           age: action.payload.age
         },
      };
    }

    case AuthActionTypes.SEARCH_DATA_SUCCESS: {
      //debugger;
      return newState(state, { text: action.payload });
    }
    case AuthActionTypes.DELETE_DATA_SUCCESS: {
      //debugger;
      return newState(state, { text: action.payload });
    }
    case AuthActionTypes.ADD_DATA_SUCCESS : {
      return sampledataAdapter.addAll(action.payload, state);
    }


   

    default: {
      return state;
    }
  }
}

export const getCurrentContactId = (state: State) => state.currentContactId;