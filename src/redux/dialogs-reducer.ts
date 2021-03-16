const ADD_MESSAGE = 'ADD-MESSAGE';

type DialogType = {
    id: number,
    name: string
}
type MessageType = {
    text: string
}

let initialState = {
    dialogs : [
        {id:1, name: 'Mike'},
        {id:2, name: 'John'},
        {id:3, name: 'Dave'},
        {id:4, name: 'Mick'},
        {id:5, name: 'Corey'},
        {id:6, name: 'Chester'}
    ] as Array<DialogType>,
    messages : [
        {text: 'Hi!'},
        {text: 'How are you?'},
        {text: 'What is you favourite color?'}
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
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

type AddMessageCreatorType = {
    type: typeof ADD_MESSAGE,
    newMessageBody: string
}

export const addMessageActionCreator = (newMessageBody: string): AddMessageCreatorType => ({ type: ADD_MESSAGE, newMessageBody });