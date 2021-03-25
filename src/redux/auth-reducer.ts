import {ResultCodesEnum, ResultCodeWithCaptcha} from "../api/api";
import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {captchaAPI} from "../api/captcha-api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL';

let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
};

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_CAPTCHA_URL:
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state;
    }
}

export default authReducer;

type ActionsTypes = SetAuthUserDataActionType | SetCaptchaUrlActionType

type SetAuthUserDataActionPayloadType =  {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, login, email, isAuth}
});

type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    payload: { captchaUrl: string }
}
export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({
    type: SET_CAPTCHA_URL,
    payload: {captchaUrl}
});

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, any>

export const getAuthUserData = (): ThunkType => async (dispatch: DispatchType) => {
    let response = await authAPI.autorize();
    if (response.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = response.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
    async (dispatch: ThunkDispatchType) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (response.resultCode === ResultCodeWithCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        let message = response.messages.length > 0 ? response.messages[0] : 'Some Error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await captchaAPI.getCaptchaUrl();
    debugger
    dispatch(setCaptchaUrl(response.data.url));
}


