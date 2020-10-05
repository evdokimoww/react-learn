let store = {
    _state: {
        profilePage: {
            posts : [
                {id: 1, text: 'Hello, how are you?', likeCount: 15},
                {id: 2, text: 'It is my first project on React js', likeCount: 19},
                {id: 3, text: 'It is my first project', likeCount: 22}
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs : [
                {id:1, name: 'Mike'},
                {id:2, name: 'John'},
                {id:3, name: 'Dave'},
                {id:4, name: 'Mick'},
                {id:5, name: 'Corey'},
                {id:6, name: 'Chester'}
            ],
            messages : [
                {text: 'Hi!'},
                {text: 'How are you?'},
                {text: 'What is you favourite color?'}
            ]
        },
        sidebarFriends: {
            friend : [
                { name: 'Alex', src: 'https://www.erblearn.org/sites/default/files/images/Membership/201904_membership_renewal.png' },
                { name: 'Egor', src: 'https://www.erblearn.org/sites/default/files/images/Membership/201904_membership_renewal.png' },
                { name: 'Anastasia', src: 'https://www.erblearn.org/sites/default/files/images/Membership/201904_membership_renewal.png' },
            ]
        }
    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        if (action.type === 'ADD-POST') {
            let newPost = {
                id: 5,
                text: this._state.profilePage.newPostText,
                likeCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        } else if (action.type === 'UPDATE-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }
    }
}

export default store;