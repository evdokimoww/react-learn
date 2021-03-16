import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {MaxLengthConstructor, required} from "../../../utils/validators/validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";

const MyPosts = React.memo(props => {
    let postsItems = props.posts.map( post => <Post text={post.text} likeCount={post.likeCount} key={post.id} />);

    let addNewPostText = (values) => {
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

let maxLength10 = MaxLengthConstructor(10);

const AddNewPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} name={'newPostText'}
                   placeholder={'Enter your post text here...'}
                   validate={[required, maxLength10]}/>
        </div>
        <div>
            <button>add new post</button>
        </div>
    </form>
}

const AddNewPostReduxForm = reduxForm({form: 'addNewPostForm'})(AddNewPostForm);

export default MyPosts;