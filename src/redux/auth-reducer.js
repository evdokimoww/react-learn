import {authAPI, captchaAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL';

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CAPTCHA_URL:
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

export const setAuthUserData = (userId, login, email, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, login, email, isAuth}
});

export const setCaptchaUrl = (captchaUrl) => ({
    type: SET_CAPTCHA_URL,
    payload: {captchaUrl}
});

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.autorize();
    if (response.resultCode === 0) {
        let {id, login, email} = response.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
         if (response.resultCode === 10) {
             dispatch(getCaptchaUrl());
         }
        let message = response.messages.length > 0 ? response.messages[0] : 'Some Error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await captchaAPI.getCaptcaUrl();
    dispatch(setCaptchaUrl(response.url));
}


