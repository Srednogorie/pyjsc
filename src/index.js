import React from 'react';
import ReactDOM from 'react-dom';
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/github.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {GlobalStateProvider} from './globalState';
import {BrowserRouter} from "react-router-dom";


hljs.initHighlightingOnLoad();

ReactDOM.render(
    <GlobalStateProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </GlobalStateProvider>
    , document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
