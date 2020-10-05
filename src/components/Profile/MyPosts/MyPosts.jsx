import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";

const MyPosts = (props) => {
    let postsItems = props.posts.map( post => <Post text={post.text} likeCount={post.likeCount} />);

    let newPostElement = React.createRef();

    let addPost = () => {
         props.dispatch( {type: 'ADD-POST'} );
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.dispatch( {type: 'UPDATE-POST-TEXT', newText: text} );
    }

    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>
            <div>
                <textarea onChange={ onPostChange } ref={ newPostElement } value={props.newPostText} />
            </div>
            <div>
                <button onClick={ addPost }>new post</button>
            </div>
            <div className={s.posts}>
                { postsItems }
            </div>
        </div>
    )
}

export default MyPosts;