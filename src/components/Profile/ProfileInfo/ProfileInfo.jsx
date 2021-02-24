import React, {useState} from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import UserImage from "../../../assets/images/user.png";
import ProfileDataForm from "../ProfileDataForm";

const ProfileInfo = ({profile, isOwner, status, updateStatus, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoChange = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }

    return (
        <div>
            <div>
                <img className={s.profileImage}
                     src='https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large != null ? profile.photos.large : UserImage}/>

                {isOwner && <input type={"file"} onChange={onMainPhotoChange}/>}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <hr/>

                {editMode
                    ? <ProfileDataForm initialValues={profile}
                                       onSubmit={onSubmit}
                                       profile={profile}/>
                    : <ProfileData profile={profile}
                                   isOwner={isOwner}
                                   goToEditMode={() => {setEditMode(true)}}/>}

            </div>
        </div>
    );
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}

        <div><strong>Full Name:</strong> {profile.fullName}</div>
        <div><strong>About Me:</strong> {profile.aboutMe}</div>
        <div><strong>Need Job?</strong> {profile.lookingForAJob ? 'yes' : 'no'}</div>
        {profile.lookingForAJob &&
        <div><strong>My skills:</strong> {profile.lookingForAJobDescription}</div>
        }
        <div>
            <strong>Contacts:</strong>
            <div className={s.contacts}>
                {Object.keys(profile.contacts).map(key => (
                    <Contact contactTitle={key}
                             contactValue={profile.contacts[key]}/>
                ))}
            </div>
        </div>
    </div>
}

const Contact = ({contactTitle, contactValue}) => {
    return <div><i>{contactTitle}:</i> {contactValue}</div>
}

export default ProfileInfo;