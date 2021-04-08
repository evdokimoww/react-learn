import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {AddNewPostFormValuesType, AddNewPostReduxForm} from "./AddNewPostForm";
import {PostType} from "../../../types/types";

export type MapPropsType = {
    posts: Array<PostType>
 }
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
 }

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props => {
    let postsItems = props.posts.map( post => <Post text={post.text} likeCount={post.likeCount} key={post.id} />);

    let addNewPostText = (values: AddNewPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>

            <AddNewPostReduxForm onSubmit={addNewPostText}/>
            <div className={s.posts}>
                { postsItems }
            </div>
        </div>
    )
});

const MyPostsMemoized = React.memo(MyPosts);

export default MyPostsMemoized;