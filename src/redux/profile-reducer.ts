import {ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType } from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";


let initialState = {
    posts: [
        {id: 1, text: 'Hello, how are you?', likeCount: 15},
        {id: 2, text: 'It is my first project on React js', likeCount: 19},
        {id: 3, text: 'It is my first project', likeCount: 22}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}



const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "PROFILE/ADD_POST": {
            let newPost = {
                id: 5,
                text: action.newPostBody,
                likeCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case "PROFILE/DELETE_POST": {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case "PROFILE/SET_PROFILE":{
            return {
                ...state,
                profile: action.profile
            }
        }
        case "PROFILE/SET_STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        case "PROFILE/SAVE_PHOTO_SUCCESS": {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }
}



export const actions = {
    addPostActionCreator: (newPostBody: string) => ({type: 'PROFILE/ADD_POST', newPostBody} as const),
    setProfile: (profile: ProfileType) => ({type: 'PROFILE/SET_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'PROFILE/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'PROFILE/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}

export const getProfile = (userId: number):ThunkType => async (dispatch) => {
    const profileData = await profileAPI.getProfile(userId)
    dispatch(actions.setProfile(profileData))
}

export const getStatus = (userId: number):ThunkType => async (dispatch) => {
    const statusData = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(statusData));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const statusData = await profileAPI.updateStatus(status);
    if (statusData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === ResultCodesEnum.Success){
        if (userId != null){
            dispatch(getProfile(userId))
        } else {
            throw new Error("user id can't be null")
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}));
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer;

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>