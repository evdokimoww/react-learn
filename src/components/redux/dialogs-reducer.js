const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';

let initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                text: state.newMessageText
            };
            return {
                ...state,
                messages: [ ...state.messages, newMessage],
                newMessageText: ''
            }
        }
        case UPDATE_MESSAGE_TEXT: {
            return {
                ...state,
                newMessageText: action.newText
            }
        }
        default:
            return state;
    }
}

export default dialogsReducer;
export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });
export const updateMessageTextActionCreator = (text) => ({ type: UPDATE_MESSAGE_TEXT, newText: text });