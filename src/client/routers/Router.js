import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Home, SignUp, PwReset, PwResetCompleted, NotFound } from '../pages/index';

const Router = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/signup" component={SignUp}/>
            <Route exact path="/help/pwreset" component={PwReset}/>
            <Route path="/help/pwreset/completed" component={PwResetCompleted}/>
            <Route path="/auth" component={PwResetCompleted}/>
            <Route component={NotFound}/>
        </Switch>
        <ul>
            <li><Link to="/">Home</Link></li>
        </ul>
    </div>
);

export default Router;