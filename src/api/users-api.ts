import {GetItemsType, instance, APIResponseType} from "./api"


export const userAPI = {
    getUser(pageSize = 10, currentPage = 1, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(
            `users?count=${pageSize}&page=${currentPage}&term=${term}` + (friend === null ? `` : `&friend=${friend}`)
        )
            .then(response => response.data)
    },
    followUser(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data) as Promise<APIResponseType>
    }
}