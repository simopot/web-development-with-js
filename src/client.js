//import './client.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router'

import BulletinBoardApp from './components/BulletinBoardApp';
//import MainPage from './components/MainPage';

const routes = (
    <Router>
        <Route path="/" component={BulletinBoardApp}>
        </Route>
    </Router>
);

ReactDOM.render(
    routes,
    document.getElementById('app')
);
