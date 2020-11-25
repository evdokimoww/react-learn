import React from "react";
import s from './Paginator.module.css'

export const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    debugger
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
            { pages.map(p => <button className={currentPage  === p && s.selectedPage}
                                       onClick={ () => {onPageChanged(p)} }>{p}</button>)}
        </div>
}