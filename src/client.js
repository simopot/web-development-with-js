import './client.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router'

import HelloWorldApp from './components/HelloWorldApp';
import MainPage from './components/MainPage';
import Greeter from './components/Greeter';

const routes = (
    <Router>
        <Route path="/" component={HelloWorldApp}>
            <IndexRoute component={MainPage}/>
            <Route path="/hello/:name" component={Greeter}/>
        </Route>
    </Router>
);

ReactDOM.render(
    routes,
    document.getElementById('app')
);
