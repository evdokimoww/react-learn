import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {InjectedFormProps, reduxForm} from "redux-form";
import {DialogType, MessageType} from "../../redux/dialogs-reducer";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";

type OwnPropsType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>
    sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageText: string
}

const Dialogs: React.FC<OwnPropsType> = (props) => {
    let dialogsItems = props.dialogs.map( dialog => <DialogItem name={dialog.name} id={dialog.id}/> )
    let messagesItems = props.messages.map( message => <Message message={message.text} /> )

    let addNewMessage = (values: {newMessageText: string}) => {
        props.sendMessage(values.newMessageText)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                { dialogsItems }
            </div>
            <div className={s.messages}>
                { messagesItems }
            </div>
            <AddNewMessageReduxForm onSubmit={addNewMessage}/>
        </div>
     );
}

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const AddNewMessage: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            {createField<NewMessageFormValuesKeysType>(Textarea, 'newMessageText', 'Enter your message', [required])}
        </div>
        <div>
            <button>send message</button>
        </div>
    </form>
}

const AddNewMessageReduxForm = reduxForm<NewMessageFormValuesType, PropsType>({form:'addNewMessage'})(AddNewMessage);


export default Dialogs;