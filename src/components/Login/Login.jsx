import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import s from "./../../common/FormsControls/FormsControls.module.css"

const Login = (props) =>{
    const onSubmit = (formData) => {
        let {email, password, rememberMe} = formData;
        props.login(email, password, rememberMe);
    }

    if (props.isAuth){
        return <Redirect to={'/profile'} />
    }

    return(
        <div>
            <h1>login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Input} name={'email'} placeholder={'email'}
                   validate={[required]} />
        </div>
        <div>
            <Field component={Input} name={'password'} placeholder={'password'} type={'password'}
                   validate={[required]} />
        </div>
        <div>
            <Field component={Input} name={'rememberMe'} type={'checkbox'}/><label htmlFor={'rememberMe'}>remember me</label>
        </div>
        {props.error &&  <div className={s.formSummaryError}>
            {props.error}
        </div>
        }


        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const mapStateToProps = (state) =>({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);