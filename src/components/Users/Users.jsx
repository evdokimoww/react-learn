import React from "react";
import {User} from "./User";
import Paginator from "../../common/Paginator/Paginator";

export const Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, ...props}) => {
    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize} />
        <div>
            { props.users.map(u => <User user={u}
                                         followingInProgress={props.followingInProgress}
                                         follow={props.follow}
                                         unfollow={props.unfollow}
                                         key={u.id}/>)}
        </div>

    </div>
}