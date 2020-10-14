import React from "react";
import {connect} from "react-redux";
import Friends from "./Friends";

let mapStateToProps = (state) => {
    return {
        friend: state.sidebarFriends.friend
    }
}

let mapDispatchToProps = (dispatch) => {
    return{

    }
}


const FriendsContainer = connect(mapStateToProps, )(Friends);

export default FriendsContainer;