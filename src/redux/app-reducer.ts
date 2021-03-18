import {getAuthUserData} from "./auth-reducer";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}

export default appReducer;

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessActionType  => ({type: INITIALIZED_SUCCESS});

// type ActionsTypes = InitializedSuccessActionType
// type DispatchType = Dispatch<ActionsTypes>

export const initializeApp = ()  => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserData());

        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess());
                });
    }
}


