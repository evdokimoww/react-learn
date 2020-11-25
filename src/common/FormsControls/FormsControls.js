import React from "react";
import s from "./FormsControls.module.css"
import {Field} from "redux-form";

const FormControl = ({input, meta: {touched, error}, children, ...props}) => {
    const hasRequired = touched && error;

    return <div className={s.formControl + ' ' + (hasRequired && s.error)}>
        <div>
            {children}
        </div>
        {hasRequired && <div><span>{error}</span></div>}
    </div>
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>;
}

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>;
}

export const createField = (component, name, placeholder, validate = [], props = {}, text = '') => {
    return <div>
        <Field component={component}
               name={name}
               placeholder={placeholder}
               validate={validate}
               {...props}/> {text}
    </div>
}