import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e1cb21b1-f56c-4dc1-a63a-ced9e802e08a'
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeWithCaptcha {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>,
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}


