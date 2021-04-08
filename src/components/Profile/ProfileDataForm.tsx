import s from "./ProfileInfo/ProfileInfo.module.css";
import React from "react";
import {createField, GetStringKeys, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import style from "../../common/FormsControls/FormsControls.module.css";
import {ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType
}

type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form>
        <div><button onClick={handleSubmit}>save</button></div>

        { error && <div className={style.formSummaryError}>
            {error}
        </div>
        }
        <div><strong>Full Name:</strong> {createField<ProfileTypeKeys>(Input, 'fullName', 'Full name', [])}</div>
        <div><strong>About Me:</strong> {createField<ProfileTypeKeys>(Textarea, 'aboutMe', 'About me', [])}</div>
        <div><strong>Need Job?</strong> {createField<ProfileTypeKeys>(Input, 'lookingForAJob', '', [], {type: 'checkbox'})}</div>
        <div><strong>My skills:</strong> {createField<ProfileTypeKeys>(Textarea, 'lookingForAJobDescription', 'My professional skills', [])}</div>
        <div>
            <strong>Contacts:</strong>
            <div className={s.contacts}>
                {Object.keys(profile.contacts).map(key => (
                    <div>{key}: {createField(Input, 'contacts.' + key, key, [])}</div>
                ))}
            </div>
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm
