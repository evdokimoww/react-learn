import {userAPI} from "../api/api";
import {UserType} from "../types/types";
import {updateObjectInArray} from "../utils/object-helpers";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 100 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number> // array of users ids
};

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

export default usersReducer;

type ActionsTypes = AccessFollowActionType | AccessUnfollowActionType | SetUsersActionType | SetCurrentPageActionType |
    SetTotalUsersCountActionType | ToggleIsFetchingActionType | ToggleIsFollowingProgressActionType

type AccessFollowActionType = {
    type: typeof FOLLOW
    userId: number
}
export const accessFollow = (userId: number): AccessFollowActionType => ({type: FOLLOW, userId})

type AccessUnfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const accessUnfollow = (userId: number): AccessUnfollowActionType => ({type: UNFOLLOW, userId})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
});

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});

type ToggleIsFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (pageSize: number, currentPage: number): ThunkType =>
    async (dispatch: DispatchType) => {
        dispatch(toggleIsFetching(true));
        let response = await userAPI.getUser(pageSize, currentPage);

        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
    }

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => AccessFollowActionType | AccessUnfollowActionType) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleIsFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType =>
    async (dispatch: DispatchType) => {
        let apiMethod = userAPI.followUser.bind(userAPI);
        let actionCreator = accessFollow;
        _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }

export const unfollow = (userId: number): ThunkType =>
    async (dispatch: DispatchType) => {
        let apiMethod = userAPI.unfollowUser.bind(userAPI);
        let actionCreator = accessUnfollow;
        _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }