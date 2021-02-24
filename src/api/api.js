import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e2fdf526-603c-4dca-980a-cce7ed36b0f7'
    },
    secure: true,
    sameSite: true
})

export const userAPI = {
    getUser(pageSize = 10, currentPage = 1) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`)
            .then(response => {
                    return response.data;
                }
            )
    },
    followUser(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    getProfile(userId) {
        console.warn('Please, use profileAPI method');
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status })
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    }
}

export const authAPI = {
    autorize() {
        return instance.get(`/auth/me`)
            .then(response => {
                return response.data;
            })
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`/auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data;
            })
    },
    logout() {
        return instance.delete(`/auth/login`)
            .then(response => {
                return response.data;
            })
    }
}

export const captchaAPI = {
    getCaptcaUrl() {
        return instance.get(`/security/get-captcha-url`)
            .then(response => {
                return response.data;
            })
    }
}