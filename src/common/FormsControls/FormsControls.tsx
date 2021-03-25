import React from "react"
import s from "./FormsControls.module.css"
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form"
import {FieldValidatorType} from "../../utils/validators/validators"

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasRequired = touched && error;

    return <div className={s.formControl + " " + (hasRequired && s.error)}>
        <div>
            {children}
        </div>
        { hasRequired && <span>{error}</span>}
    </div>
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props} > <textarea {...input} {...restProps} /></FormControl>;
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props} > <input {...input} {...restProps}/></FormControl>;
}

export function createField<FormKeysType extends string> (component: React.FC<WrappedFieldProps>,
                            name: FormKeysType,
                            placeholder: string | undefined,
                            validators: Array<FieldValidatorType>,
                            props = {},
                            text = '') {
    return <div>
        <Field component={component}
               name={name}
               placeholder={placeholder}
               validate={validators}
               {...props}
        /> {text}
    </div>
}
