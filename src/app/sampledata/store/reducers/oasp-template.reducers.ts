    import { Login } from '../../../sampledata/models/login.model';
    import { EntityState, createEntityAdapter } from '@ngrx/entity';
    import { AuthActionTypes, All } from '../actions/oasp-templetes.actions';
    export const sampledataAdapter = createEntityAdapter<Login>(
    );
    export interface State extends EntityState<Login> {
      currentContactId?: number;
    }
    export interface State {
        isAuthenticated: boolean;
        user: Login | null;
        errorMessage: string | null;
        successmassage: string | null;
        text: string | null;
    }
    export const initialState: State = sampledataAdapter.getInitialState({
        isAuthenticated: false,
        user: undefined,
        errorMessage: undefined,
        text: undefined,
        successmassage:undefined
    });
    const newState = (state, newData) => {
      return Object.assign({}, state, newData)
    }
    export function reducer(state: State = initialState, action: All): State {
      
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
              successmassage: 'login Successfully'
            };
        }
        case AuthActionTypes.LOGOUT: {
          return initialState;
        }
        case AuthActionTypes.LOGIN_FAILURE: {
          return {
            ...state,
             errorMessage: 'Incorrect username and/or password.'
          };
        }
        case AuthActionTypes.ADD_DATA_SUCCESS: {
          return {
            ...state, user:
            {
                name: action.payload.name,
                surname: action.payload.surname,
                email: action.payload.email,
                age: action.payload.age
            },
          };
        }
        case AuthActionTypes.EDIT_DATA_SUCCESS: {
          return {
            ...state, user:
              {
                id :action.payload.id,
                name: action.payload.name,
                surname: action.payload.surname,
                email: action.payload.email,
                age: action.payload.age
              },
          };
        }
        case AuthActionTypes.SEARCH_DATA_SUCCESS: {
          return {
            ...state, 
            successmassage:'successfully Search'
          };
        }
        case AuthActionTypes.DELETE_DATA_SUCCESS: {
          return {
            ...state, user:
            {
              id :action.payload.id,
              name: action.payload.name,
              surname: action.payload.surname,
              email: action.payload.email,
              age: action.payload.age
            },
            successmassage:'successfully Remove Data'
          };
        }
        default: {
          return state;
        }
      }
    }
    export const getCurrentContactId = (state: State) => state.currentContactId;