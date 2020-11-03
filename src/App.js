import React from 'react';
import './App.css';
import {Route, BrowserRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Sidebar from "./components/Sidebar/Sidebar";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer />
                <Sidebar />
                <div className='app-wrapper-content'>
                    <Route path='/profile/:userId?' render={ () => <ProfileContainer /> }/>
                    <Route path='/dialogs' render={ () => <DialogsContainer /> }/>
                    <Route path='/users' render={ () => <UsersContainer /> }/>
                    <Route path='/login' render={ () => <Login /> }/>
                    <Route path='/news' render={ () => <News /> }/>
                    <Route path='/music' render={ () => <Music /> }/>
                    <Route path='/settings' render={ () => <Settings /> }/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
