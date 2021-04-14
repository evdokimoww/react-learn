import {Field, Form, Formik} from "formik";
import React from "react";
import { FilterType } from "../../redux/users-reducer";

const UsersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FormType = {
    term: string,
    friend: 'true' | 'false' | 'null'
}

export const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChanged}) => {
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div>
        <Formik
            initialValues={{term: '', friend: 'null'}}
            validate={UsersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field
                        component="select"
                        name="friend"
                    >
                        <option value="null">All</option>
                        <option value="true">Only Followed</option>
                        <option value="false">Only Unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})