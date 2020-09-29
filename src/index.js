import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let posts = [
    {text: 'Hello, how are you?', likeCount: 15},
    {text: 'It is my first project on React js', likeCount: 19},
    {text: 'It is my first project', likeCount: 22}
]

let dialogs = [
    {id:1, name: 'Mike'},
    {id:2, name: 'John'},
    {id:3, name: 'Dave'},
    {id:4, name: 'Mick'},
    {id:5, name: 'Corey'},
    {id:6, name: 'Chester'}
]

let messages = [
    {text: 'Hi!'},
    {text: 'How are you?'},
    {text: 'What is you favourite color?'}
]

ReactDOM.render(<App posts={posts} dialogs={dialogs} messages={messages} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
