import {profileAPI, userAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts : [
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
        case SET_PROFILE: {
            return  {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return  {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

export default profileReducer;

export const addPostActionCreator = (newPostBody) => ({ type: ADD_POST, newPostBody});
export const setProfile = (profile) => ({ type: SET_PROFILE, profile});
export const setStatus = (status) => ({ type: SET_STATUS, status});

export const getProfile = (userId) => {
    return (dispatch) => {
            userAPI.getProfile(userId).then(response => {
                dispatch(setProfile(response.data));
            })
    }
}

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response.data));
        })
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
    }
}