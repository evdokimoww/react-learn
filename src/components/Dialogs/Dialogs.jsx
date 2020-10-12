import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {addMessageActionCreator, updateMessageTextActionCreator} from '../redux/dialogs-reducer';


const Dialogs = (props) => {
    let dialogsItems = props.dialogs.map( dialog => <DialogItem name={dialog.name} id={dialog.id}/> )
    let messagesItems = props.messages.map( message => <Message message={message.text} /> )
    let newMessageElement = React.createRef();

    let onАddMessage = () => {
        props.addMessage();
    }

    let onMessageChange = () => {
        let text = newMessageElement.current.value;
        props.updateMessageText(text);
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                { dialogsItems }
            </div>
            <div className={s.messages}>
                { messagesItems }
                <div>
                    <textarea onChange={ onMessageChange } ref={ newMessageElement } value={ props.newMessageText } />
                </div>
                <div>
                    <button onClick={ onАddMessage }>send message</button>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;