import React, {Suspense} from 'react';
import './App.css';
import {Route, withRouter, Switch, BrowserRouter} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import Sidebar from "./components/Sidebar/Sidebar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import HeaderContainer from "./components/Header/HeaderContainer";
import {initializeApp} from "./redux/app-reducer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import Preloader from "./common/Preloader/Preloader";
import {AppStateType, store} from "./redux/redux-store";
import { UserPage } from './components/Users/UsersContainer';
import { Login } from './components/Login/Login';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Sidebar/>
                <div className='app-wrapper-content'>
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <Switch>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                            <Route path='/users' render={() => <UserPage />}/>
                            <Route path='/login' render={() => <Login/>}/>
                            <Route path='/news' render={() => <News/>}/>
                            <Route path='/music' render={() => <Music/>}/>
                            <Route path='/settings' render={() => <Settings/>}/>
                            <Route path='' render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </Suspense>

                </div>
            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

const MyApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MyApp