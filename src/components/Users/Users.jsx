import React from "react";
import * as axios from 'axios';
import UserImage from '../../assets/images/user.png'
import s from './Users.module.css'

class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            })
    }

    render() {
        debugger
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for ( let i = 1; i <= pagesCount; i++ ) {
            pages.push(i);
        }

        return <div>
            <div>
                { pages.map( p => <button className={ this.props.currentPage === p && s.selectedPage } onClick={ () => { this.onPageChanged(p) }}>{p}</button> ) }
            </div>

            { this.props.users.map(u => <div key={u.id}>
                    <div>
                        <img className={s.userImage} src={u.photos.small != null ? u.photos.small : UserImage}/>
                    </div>
                    <div>
                        {u.followed ? <button onClick={() => {
                            this.props.unfollow(u.id)
                        }}>Unfollow</button> : <button onClick={() => {
                            this.props.follow(u.id)
                        }}>Follow</button>}
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