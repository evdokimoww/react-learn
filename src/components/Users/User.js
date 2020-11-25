import {NavLink} from "react-router-dom";
import s from "./Users.module.css";
import UserImage from "../../assets/images/user.png";
import React from "react";

export const User = ({user, followingInProgress, unfollow, follow, ...props}) => {
    return <div>
        <div>
            <NavLink to={`/profile/` + user.id}>
                <img className={s.userImage} src={user.photos.small != null ? user.photos.small : UserImage}/>
            </NavLink>
        </div>
        <div>
            {user.followed ?
                <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                    unfollow(user.id);
                }}>
                    Unfollow</button> :
                <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                    follow(user.id);
                }}>
                    Follow</button>}
        </div>
        <div>
            <div>{user.name}</div>
            <div>{user.status}</div>
            <div>{'user.location.city'}, {'user.location.country'}</div>
        </div>
    </div>
}