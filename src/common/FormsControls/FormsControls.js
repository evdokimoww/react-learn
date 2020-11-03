import React from "react";
import s from "./FormsControls.module.css"

const FormControl = ({input, meta, child,  ...props}) => {
    const hasRequired = meta.touched && meta.error;

    return <div className={s.formControl + ' ' + (hasRequired && s.error)}>
        <div>
            {props.children}
        </div>
        { hasRequired && <div><span>{meta.error}</span></div>}
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