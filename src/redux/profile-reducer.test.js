import React from 'react';
import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

let state = {
    posts : [
        {id: 1, text: 'Hello, how are you?', likeCount: 15},
        {id: 2, text: 'It is my first project on React js', likeCount: 19},
        {id: 3, text: 'It is my first project', likeCount: 22}
    ]
}

test('posts length should be incremented', () => {
    // test data
    let action = addPostActionCreator('new test post text');
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.posts.length).toBe(4);
});

test(`message text should be 'new test post text'`, () => {
    // test data
    let action = addPostActionCreator('new test post text');
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.posts[3].text).toBe('new test post text');
});

test(`post should be deleted`, () => {
    // test data
    let action = deletePost(2);
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.posts.length).toBe(2);
});

test(`post should be deleted`, () => {
    // test data
    let action = deletePost(1000);
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.posts.length).toBe(3);
});
