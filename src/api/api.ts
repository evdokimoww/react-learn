import axios from "axios";
import {ProfileType, UserType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e2fdf526-603c-4dca-980a-cce7ed36b0f7'
    }
    // },
    // secure: true,
    // sameSite: true
})

type UsersResponseType = Array<UserType>
type FollowUnfollowUserResponseType = {
    data: {}
    messages: Array<string>
    resultCode: ResultCodesEnum
}
export const userAPI = {
    getUser(pageSize = 10, currentPage = 1) {
        return instance.get<UsersResponseType>(`users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data)
    },
    followUser(userId: number) {
        return instance.post<FollowUnfollowUserResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollowUser(userId: number) {
        return instance.delete<FollowUnfollowUserResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    getProfile(userId: number) {
        console.warn('Please, use profileAPI method');
        return profileAPI.getProfile(userId);
    }
}

type ProfileResponseType =  ProfileType
type GetStatusResponseType = string
type UpdateStatusResponseType = {
    data: {}
    messages: Array<string>
    resultCode: ResultCodesEnum
}

type SaveProfileResponseType = {
    data: {}
    messages: Array<string>
    resultCode: ResultCodesEnum
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileResponseType>(`profile/` + userId)
            .then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get<GetStatusResponseType>(`profile/status/` + userId)
            .then(response => response.data);
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusResponseType>(`profile/status`, { status: status })
            .then(response => response.data);
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put<SaveProfileResponseType>(`profile`, profile)
            .then(response => response.data);
    }
}

type MeResponseType = {
    data: {id: number, email: string, login: string}
    messages: Array<string>
    resultCode: ResultCodesEnum
}
type LoginResponseType = {
    data: {userId: number}
    messages: Array<string>
    resultCode: ResultCodesEnum | ResultCodeWithCaptcha
}
type LogoutResponseType = {
    data: {}
    messages: Array<string>
    resultCode: ResultCodesEnum
}
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeWithCaptcha {
    CaptchaIsRequired = 10
}

export const authAPI = {
    autorize() {
        return instance.get<MeResponseType>(`/auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: string) {
        return instance.post<LoginResponseType>(`/auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>(`/auth/login`)
            .then(response => response.data)
    }
}

type GetCaptchaResponseType = {
    data: {url: string}
}

export const captchaAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaResponseType>(`/security/get-captcha-url`)
            .then(response => response.data)
    }
}