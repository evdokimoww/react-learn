import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";

const MyPosts = (props) => {

    let postsItems = props.posts.map( post => <Post text={post.text} likeCount={post.likeCount} />);

    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>new post</button>
            </div>
            <div className={s.posts}>
                { postsItems }
            </div>
        </div>
    )
}

export default MyPosts;