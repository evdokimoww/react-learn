import {getAuthUserData} from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";

let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>


const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'APP/INITIALIZED_SUCCESS': {
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

export const actions = {
    initializedSuccess: () => ({type: 'APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = ()  => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserData());

        Promise.all([promise])
            .then(() => {
                dispatch(actions.initializedSuccess());
                });
    }
}


