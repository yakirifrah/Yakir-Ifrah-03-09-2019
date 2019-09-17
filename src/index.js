import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/scss/bootstrap.scss';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "react-toggle/style.css";

import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './store/reducer';
import { ThemeProvider } from './context';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhances(
    applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
