import React from 'react';
import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import MyApp from './App';

type AppType = {
    App: typeof React.Component
}

    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <MyApp />
            </Provider>
        </BrowserRouter>, document.getElementById('root')) ;


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
