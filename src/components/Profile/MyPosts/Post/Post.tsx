import React from "react";
import s from "./Post.module.css"

type PropsType = {
    text: string
    likeCount: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <img src ="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png"/>
            {props.text}
            <div>
                likes: {props.likeCount}
            </div>
        </div>
    )
}

export default Post;