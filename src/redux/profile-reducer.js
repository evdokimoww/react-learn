import {profileAPI, userAPI} from "../api/api";
import React from "react";
import {stopSubmit} from "redux-form";

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
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
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
                profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state;
    }
}

export default profileReducer;

export const addPostActionCreator = (newPostBody) => ({type: ADD_POST, newPostBody});
export const setProfile = (profile) => ({type: SET_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

export const getProfile = (userId) => async (dispatch) => {
    const response = await userAPI.getProfile(userId);
    dispatch(setProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getProfile(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0])
    }
}