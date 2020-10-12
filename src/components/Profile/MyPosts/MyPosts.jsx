import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";

const MyPosts = (props) => {
    let postsItems = props.posts.map( post => <Post text={post.text} likeCount={post.likeCount} />);
    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updatePostText(text);
    }

    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>
            <div>
                <textarea onChange={ onPostChange } ref={ newPostElement } value={ props.newPostText } />
            </div>
            <div>
                <button onClick={ onAddPost }>new post</button>
            </div>
            <div className={s.posts}>
                { postsItems }
            </div>
        </div>
    )
}

export default MyPosts;