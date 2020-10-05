import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={props.state.posts}
                     addPost={props.addPost}
                     newPostText={props.newPostText}
                     updatePostText={props.updatePostText}/>
        </div>
    );
}

export default Profile;