import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Home, SignUp, PwReset, PwResetCompleted, NotFound } from '~c/pages/index';

const Router = () => (
    <div>
        <Switch>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/help/pwreset" component={PwReset}/>
            <Route exact path="/help/pwreset/completed" component={PwResetCompleted}/>
            <Route path="/auth" component={PwResetCompleted}/>
            <Route exact path="/" component={Home}/>
            <Route exact path='/info/privacy' component={Home}/>
            <Route exact path='/info/posts' component={Home}/>
            <Route exact path='/info/replys' component={Home}/>
            <Route component={NotFound}/>
        </Switch>
        <ul>
            <li><Link to="/">Home</Link></li>
        </ul>
    </div>
);

export default Router;