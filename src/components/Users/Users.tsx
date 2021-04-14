import React, {useEffect} from "react";
import {User} from "./User";
import Paginator from "../../common/Paginator/Paginator";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage, getUsersFilter,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/users-reducer";
import {UsersSearchForm} from "./UsersSearchForm";

export const Users: React.FC = (props) => {

    const users = useSelector(getUsers)
    const currentPage = useSelector(getCurrentPage)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getUsersFilter)

    const dispatch = useDispatch();

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageSize, pageNumber, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(pageSize, 1, filter))
    }

    const following = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowing = (userId: number) => {
        dispatch(unfollow(userId))
    }

    useEffect(() => {
        dispatch(requestUsers(pageSize, currentPage, filter))
        },[])


    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>

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