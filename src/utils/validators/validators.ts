import React from "react";

export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if (value) return undefined;
    return 'Required';
}

export const MaxLengthConstructor = (maxLength: number): FieldValidatorType => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength}`;
    return undefined;
}