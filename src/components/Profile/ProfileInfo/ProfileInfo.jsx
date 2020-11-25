import React from "react";
import s from "./ProfileInfo.module.css"
import Preloader from "../../../common/Preloader/Preloader";
import ProfileStatus from './ProfileStatus.jsx'
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if( !props.profile ) {
        return <Preloader />
    }
    return (
        <div>
            <div>
                <img className={s.profileImage} src='https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                <hr/>
                <div><strong>Full Name: </strong>{props.profile.fullName}</div>
                <div><strong>About Me: </strong>{props.profile.aboutMe}</div>
                <div><strong>Need Job? </strong>{(props.profile.lookingForAJob) ? 'yes' : 'no' }</div>
                <div><strong>Skills: </strong>{props.profile.lookingForAJobDescription}</div>
            </div>
        </div>
    );
}

export default ProfileInfo;