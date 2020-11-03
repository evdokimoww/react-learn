import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";


const Dialogs = (props) => {
    debugger
    let dialogsItems = props.dialogs.map( dialog => <DialogItem name={dialog.name} id={dialog.id}/> )
    let messagesItems = props.messages.map( message => <Message message={message.text} /> )

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageText);
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

const AddNewMessage = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={'textarea'} name={'newMessageText'} placeholder={'Enter your message'} />
        </div>
        <div>
            <button>send message</button>
        </div>
    </form>
}

const AddNewMessageReduxForm = reduxForm({form:'addNewMessage'})(AddNewMessage);


export default Dialogs;