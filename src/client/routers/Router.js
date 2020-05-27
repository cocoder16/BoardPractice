import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Home, SignUp, NotFound } from '../pages/index';

const Router = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/signup" component={SignUp}/>
            <Route component={NotFound}/>
        </Switch>
        <ul>
            <li><Link to="/">Home</Link></li>
        </ul>
    </div>
);

export default Router;