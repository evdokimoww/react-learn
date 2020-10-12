import React from "react";
import s from "./Friends.module.css";
import FriendItem from "./FriendItem/FriendItem";

const Friends = (props) => {

    let friendAvatars = props.friend.map( friend => <FriendItem name={friend.name} src={friend.src}  /> )

    return (
        <div className={s.friends}>
            <h3>Friends</h3>
            <div className={s.friendsWrapper}>
                { friendAvatars }
            </div>
        </div>
    );
}

export default Friends;