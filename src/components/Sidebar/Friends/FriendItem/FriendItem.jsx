import React from "react";
import s from "./FriendItem.module.css";

const FriendItem = (props) => {

    return (
        <div className={s.friendsItem}>
            <div className={s.friendAvatar}>
                <img src={props.src} />
            </div>
            <div className={s.friendName}>
                {props.name}
            </div>
        </div>
    );
}

export default FriendItem;