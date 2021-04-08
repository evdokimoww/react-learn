import {ResultCodesEnum, ResultCodeWithCaptcha} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import { BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {captchaAPI} from "../api/captcha-api";

let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET_CAPTCHA_URL":
        case "AUTH/SET_USER_DATA": {
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state;
    }
}


export const actions = {
    setAuthUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: 'AUTH/SET_USER_DATA', payload: {userId, login, email, isAuth}
    } as const),
    setCaptchaUrl: (captchaUrl: string) => ({
        type: 'AUTH/SET_CAPTCHA_URL', payload: {captchaUrl}
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let data = await authAPI.autorize();
    if (data.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = data.data;
        dispatch(actions.setAuthUserData(id, login, email, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
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

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await captchaAPI.getCaptchaUrl();
    dispatch(actions.setCaptchaUrl(data.url));
}

export default authReducer;

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>