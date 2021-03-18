import {profileAPI, ResultCodesEnum, userAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType } from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import App from "../App";
import {type} from "os";

const ADD_POST = 'profile/ADD-POST';
const SET_PROFILE = 'profile/SET_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        {id: 1, text: 'Hello, how are you?', likeCount: 15},
        {id: 2, text: 'It is my first project on React js', likeCount: 19},
        {id: 3, text: 'It is my first project', likeCount: 22}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
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
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case SET_PROFILE:{
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }
}

export default profileReducer;

type ActionsTypes = AddPostActionType | SetProfileType | SetStatusType | DeletePostType | SavePhotoSuccessType

type AddPostActionType = {
    type: typeof ADD_POST,
    newPostBody: string
}
export const addPostActionCreator = (newPostBody: string): AddPostActionType => ({type: ADD_POST, newPostBody})

type SetProfileType = {
    type: typeof SET_PROFILE
    profile: ProfileType
}
export const setProfile = (profile: ProfileType): SetProfileType => ({type: SET_PROFILE, profile})

type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status})

type DeletePostType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostType => ({type: DELETE_POST, postId});

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos});

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, any>


export const getProfile = (userId: number):ThunkType =>
    async (dispatch: DispatchType) => {
    const profileData = await userAPI.getProfile(userId);
    dispatch(setProfile(profileData));
}

export const getStatus = (userId: number):ThunkType =>
    async (dispatch: DispatchType) => {
    const statusData = await profileAPI.getStatus(userId);
    dispatch(setStatus(statusData));
}

export const updateStatus = (status: string): ThunkType =>
    async (dispatch: DispatchType) => {
    const statusData = await profileAPI.updateStatus(status);
    if (statusData.resultCode === ResultCodesEnum.Success) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: any): ThunkType =>
    async (dispatch: DispatchType) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType =>
    async (dispatch: ThunkDispatchType, getState: () => AppStateType) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (userId != null && response.resultCode === ResultCodesEnum.Success){
        dispatch(getProfile(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.messages[0]}));
        return Promise.reject(response.messages[0])
    }
}