import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";


const Dialogs = (props) => {
    let dialogsItems = props.state.dialogs.map( dialog => <DialogItem name={dialog.name} id={dialog.id}/> )
    let messagesItems = props.state.messages.map( message => <Message message={message.text} /> )

    let newMessageElement = React.createRef();

    let addMessage = () => {
        let text = newMessageElement.current.value;
        alert(text);
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                { dialogsItems }
            </div>
            <div className={s.messages}>
                { messagesItems }

                <div>
                    <textarea ref={ newMessageElement }></textarea>
                </div>
                <div>
                    <button onClick={ addMessage }>send message</button>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;