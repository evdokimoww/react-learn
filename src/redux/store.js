import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';


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
            ],
            newMessageText: ''
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
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebarFriends = sidebarReducer(this._state.sidebarFriends, action);

        this._callSubscriber(this._state);
    }

}



export default store;
window.store = store;