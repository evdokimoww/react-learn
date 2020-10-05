import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {Route, BrowserRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Sidebar from "./components/Sidebar/Sidebar";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Sidebar state={props.state.sidebarFriends} />
                <div className='app-wrapper-content'>
                    <Route path='/profile' render={ () => <Profile state={props.state.profilePage}
                                                                   newPostText={props.state.profilePage.newPostText}
                                                                   dispatch={props.dispatch}/> }/>
                    <Route path='/dialogs' render={ () => <Dialogs state={props.state.dialogsPage}/> }/>
                    <Route path='/news' render={ () => <News /> }/>
                    <Route path='/music' render={ () => <Music /> }/>
                    <Route path='/settings' render={ () => <Settings /> }/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
