import React, {useEffect} from "react";
import {User} from "./User";
import Paginator from "../../common/Paginator/Paginator";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {requestUsers, follow, unfollow} from "../../redux/users-reducer";

export const Users: React.FC = (props) => {

    const users = useSelector(getUsers)
    const currentPage = useSelector(getCurrentPage)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch();

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageSize, pageNumber))
    }

    const following = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowing = (userId: number) => {
        dispatch(unfollow(userId))
    }
    useEffect(() => {
        dispatch(requestUsers(pageSize, currentPage))
        },[])


    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize} />
        <div>
            { users.map(u => <User user={u}
                                         followingInProgress={followingInProgress}
                                         follow={following}
                                         unfollow={unfollowing}
                                         key={u.id}/>)}
        </div>

    </div>
}