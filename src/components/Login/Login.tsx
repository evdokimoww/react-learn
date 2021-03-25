import React from "react"
import {InjectedFormProps, reduxForm} from "redux-form"
import {createField, Input} from "../../common/FormsControls/FormsControls"
import {required} from "../../utils/validators/validators"
import {login} from "../../redux/auth-reducer"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import s from "./../../common/FormsControls/FormsControls.module.css"
import {AppStateType} from "../../redux/redux-store"

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return <form onSubmit={handleSubmit}>
        {createField<LoginFormValuesTypeKeys>(Input, 'email', 'email', [required])}
        {createField<LoginFormValuesTypeKeys>(Input, 'password', 'password', [required], {type: 'password'})}
        {createField<LoginFormValuesTypeKeys>(Input, 'rememberMe', undefined, [], {type: 'checkbox'}, 'remember me')}
        {error && <div className={s.formSummaryError}>
            {error}
        </div>
        }

        {captchaUrl && <img src={captchaUrl}/>}
        {captchaUrl && createField<LoginFormValuesTypeKeys>(Input, 'captcha', 'Enter symbols from image', [required])}

        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        let {email, password, rememberMe, captcha} = formData;
        props.login(email, password, rememberMe, captcha);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login);