import React from "react";
import * as axios from 'axios';
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
                { u.followed ? <button onClick={() => { props.unfollow(u.id) }} >Unfollow</button> :
                    <button onClick={() => { props.follow(u.id)}}>Follow</button>}
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


// {
//     id: 1,
//         followed: true,
//     fullName: 'Alex',
//     status: 'Its my first React project',
//     location: {city: 'Kursk', country: 'Russia'},
//     imgSrc: 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'
// },
// {
//     id: 2,
//         followed: false,
//     fullName: 'Ivan',
//     status: 'Its my first React project to',
//     location: {city: 'Moscow', country: 'Russia'},
//     imgSrc: 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'
// },
// {
//     id: 3,
//         followed: true,
//     fullName: 'Dmitry',
//     status: 'Im an developer on React js',
//     location: {city: 'Schigry', country: 'Russia'},
//     imgSrc: 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'
// }