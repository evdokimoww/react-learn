import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}

export default authReducer;

export const setAuthUserData = (userId, login, email, isAuth) => ({type: SET_USER_DATA, payload: {userId, login, email, isAuth}});

export const getAuthUserData = () => {
    return (dispatch) => {
        return authAPI.autorize().then(response => {
            if (response.resultCode === 0) {
                let {id, login, email} = response.data;
                dispatch(setAuthUserData(id, login, email, true));
            }
        })
    }
}

export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe).then(response => {
            if (response.resultCode === 0) {
                dispatch(getAuthUserData());
            } else {
                let message = response.messages.length > 0 ? response.messages[0] : 'Some Error'
                dispatch(stopSubmit('login', {_error: message}))
            }
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        authAPI.logout().then(response => {
            if (response.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        })
    }
}


