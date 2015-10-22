import 'bootstrap/dist/css/bootstrap.css';
import './client.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router'

import BulletinBoardApp from './components/BulletinBoardApp';
//import MainPage from './components/MainPage';


import { createHistory } from 'history';
const history = createHistory();

const routes = (
    <Router history={history}>
        <Route path="/" component={BulletinBoardApp}>
        </Route>
    </Router>
);

ReactDOM.render(
    routes,
    document.getElementById('app')
);
