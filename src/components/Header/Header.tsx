import React from "react";
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}

export type DispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return (
        <header className={s.header}>
            <img src='https://autodoktor.com.ua/wp-content/uploads/Logo/Total-logo-earth.png'/>

            <div className={s.loginBlock}>
                { props.isAuth === false
                    ? <NavLink to={'/login'}>Login</NavLink>
                    : <div>{props.login} - <button onClick={props.logout}>logout</button></div>
                }
            </div>
        </header>);
}

export default Header;