import React from "react";
import UserImage from '../../assets/images/user.png'
import s from './Users.module.css'
import {NavLink} from "react-router-dom";

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <div>
            {pages.map(p => <button className={props.currentPage === p && s.selectedPage} onClick={() => {
                props.onPageChanged(p)
            }}>{p}</button>)}
        </div>

        { props.users.map(u => <div key={u.id}>
            <div>
                <NavLink to={`/profile/` + u.id}><img className={s.userImage} src={u.photos.small != null ? u.photos.small : UserImage}/></NavLink>
            </div>
            <div>
                { u.followed ?
                    <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                        props.unfollow(u.id);
                    }}>
                        Unfollow</button> :
                    <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                        props.follow(u.id);
                    }}>
                        Follow</button>}
            </div>
            <div>
                <div>{u.name}</div>
                <div>{u.status}</div>
                <div>{'u.location.city'}, {'u.location.country'}</div>
            </div>
        </div>)
        }
    </div>
}
export default Users;