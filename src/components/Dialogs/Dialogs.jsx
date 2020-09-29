import React from "react";
import s from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";



const Dialogs = (props) => {

    let dialogsItems = props.dialogs.map( dialog => <DialogItem name={dialog.name} id={dialog.id}/> )

    let messagesItems = props.messages.map( message => <Message message={message.text} /> )

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                { dialogsItems }
            </div>
            <div className={s.messages}>
                { messagesItems }
            </div>
        </div>
    );
}

export default Dialogs;