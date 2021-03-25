import {UserType} from "../types/types";
import {updateObjectInArray} from "../utils/object-helpers";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {userAPI} from "../api/users-api";

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
        case 'FOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        }
        case 'SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.count}
        }
        case 'TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    accessFollow: (userId: number) => ({type: 'FOLLOW', userId} as const),
    accessUnfollow: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'TOGGLE_IS_FETCHING',
        isFetching
    } as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (pageSize: number, currentPage: number): ThunkType =>
    async (dispatch: DispatchType) => {
        dispatch(actions.toggleIsFetching(true));
        let response = await userAPI.getUser(pageSize, currentPage);

        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(response.items));
        dispatch(actions.setTotalUsersCount(response.totalCount));
    }

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType =>
    async (dispatch: DispatchType) => {
        let apiMethod = userAPI.followUser.bind(userAPI);
        let actionCreator = actions.accessFollow;
        _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }

export const unfollow = (userId: number): ThunkType =>
    async (dispatch: DispatchType) => {
        let apiMethod = userAPI.unfollowUser.bind(userAPI);
        let actionCreator = actions.accessUnfollow;
        _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }