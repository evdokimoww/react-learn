import React from "react";
import {connect} from "react-redux";
import Friends from "./Friends";

let mapStateToProps = (state) => {
    return {
        friend: state.sidebarFriends.friend
    }
}


export default  connect(mapStateToProps, {})(Friends);