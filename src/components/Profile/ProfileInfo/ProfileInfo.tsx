import React, {ChangeEvent, useState} from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import UserImage from "../../../assets/images/user.png";
import ProfileDataForm from "../ProfileDataForm";
import {ProfileType, ContactsType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile, isOwner, status, updateStatus, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
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

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
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
                {Object
                    .keys(profile.contacts)
                    .map(key => {
                        return <Contact key={key} contactTitle={key}
                                 contactValue={profile.contacts[key as keyof ContactsType]}/>
                    })}
            </div>
        </div>
    </div>
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactsPropsType>= ({contactTitle, contactValue}) => {
    return <div><i>{contactTitle}:</i> {contactValue}</div>
}

export default ProfileInfo;