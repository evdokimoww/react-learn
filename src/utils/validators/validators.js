import React from "react";

export const required = (value) => {
    if (value) return undefined;
    return 'Required';
}

export const MaxLengthConstructor = (maxLength) => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength}`;
    return undefined;
}