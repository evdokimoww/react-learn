import {createField, GetStringKeys, Textarea} from "../../../common/FormsControls/FormsControls";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {MaxLengthConstructor, required} from "../../../utils/validators/validators";

type PropsType = {

}
export type AddNewPostFormValuesType = {
    newPostText: string
}
type AddNewPostFormValuesTypeKeys = GetStringKeys<AddNewPostFormValuesType>

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormValuesType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            {createField<AddNewPostFormValuesTypeKeys>(
                Textarea,
                'newPostText',
                'Enter your post text here...',
                [required, maxLength10]
            )}
        </div>
        <div>
            <button>add new post</button>
        </div>
    </form>
}

let maxLength10 = MaxLengthConstructor(10);

export const AddNewPostReduxForm = reduxForm<AddNewPostFormValuesType, PropsType>({form: 'addNewPostForm'})(AddNewPostForm);