import s from "./ProfileInfo/ProfileInfo.module.css";
import React from "react";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import style from "../../common/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form>
        <div><button onClick={handleSubmit}>save</button></div>

        { error && <div className={style.formSummaryError}>
            {error}
        </div>
        }
        <div><strong>Full Name:</strong> {createField(Input, 'fullName', 'Full name', [])}</div>
        <div><strong>About Me:</strong> {createField(Textarea, 'aboutMe', 'About me', [])}</div>
        <div><strong>Need Job?</strong> {createField(Input, 'lookingForAJob', '', [], {type: 'checkbox'})}</div>
        <div><strong>My skills:</strong> {createField(Textarea, 'lookingForAJobDescription', 'My professional skills', [])}</div>
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

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm
