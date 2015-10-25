import 'bootstrap/dist/css/bootstrap.css';
import './client.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router'

import BulletinBoardApp from './components/BulletinBoardApp';
import Testi from './components/Greeter';
//import MainPage from './components/MainPage';


import { createHistory } from 'history';
const history = createHistory();
//const history = null;

const routes = (
    <Router history={history}>
        <Route path="/" component={null}>
        	<IndexRoute component={BulletinBoardApp} />
        	<Route path="/testi" component={Testi} />
        </Route>
    </Router>
);

ReactDOM.render(
    routes,
    document.getElementById('app')
);
