import {InferActionsTypes} from "./redux-store";

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

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'DIALOGS/ADD_MESSAGE': {
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

export const actions = {
    addMessageActionCreator: (newMessageBody: string) => ({ type: 'DIALOGS/ADD_MESSAGE', newMessageBody } as const)
};

export default dialogsReducer;

export type DialogType = {
    id: number,
    name: string
}
export type MessageType = {
    text: string
}
export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>