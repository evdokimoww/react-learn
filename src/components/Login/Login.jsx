import React from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import s from "./../../common/FormsControls/FormsControls.module.css"

const LoginForm = ({handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        { createField(Input, 'email', 'email', [required]) }
        { createField(Input, 'password', 'password', [required], {type: 'password'}) }
        { createField(Input, 'rememberMe', null, [], {type: 'checkbox'}, 'remember me') }
        { error && <div className={s.formSummaryError}>
                {error}
            </div>
        }
        <div>
            <button>Login</button>
        </div>
    </form>
}

const Login = (props) => {
    const onSubmit = (formData) => {
        let {email, password, rememberMe} = formData;
        props.login(email, password, rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);