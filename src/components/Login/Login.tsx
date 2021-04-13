import React from "react"
import {InjectedFormProps, reduxForm} from "redux-form"
import {createField, GetStringKeys, Input} from "../../common/FormsControls/FormsControls"
import {required} from "../../utils/validators/validators"
import {login} from "../../redux/auth-reducer"
import {useDispatch, useSelector} from "react-redux"
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

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const Login: React.FC= (props) => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)

    const dispatch = useDispatch();

    const loginFlow = (email: string, password: string, rememberMe: boolean, captcha: string) => {
        dispatch(login(email, password, rememberMe, captcha))
    }

    const onSubmit = (formData: LoginFormValuesType) => {
        let {email, password, rememberMe, captcha} = formData;
        loginFlow(email, password, rememberMe, captcha);
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}