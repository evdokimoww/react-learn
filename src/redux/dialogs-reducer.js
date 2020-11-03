const ADD_MESSAGE = 'ADD-MESSAGE';

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
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                text: action.newMessageBody
            };
            return {
                ...state,
                messages: [ ...state.messages, newMessage],
            }
        }
        default:
            return state;
    }
}

export default dialogsReducer;
export const addMessageActionCreator = (newMessageBody) => ({ type: ADD_MESSAGE, newMessageBody });