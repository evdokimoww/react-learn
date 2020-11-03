import React from "react";
import {addMessageActionCreator} from '../../redux/dialogs-reducer';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages}
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {dispatch(addMessageActionCreator(newMessageBody))}
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);