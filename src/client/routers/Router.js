import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Info, SignUp, LogIn, PwReset, PwResetCompleted, NotFound } from '~c/pages/index';

const Router = () => (
    <Switch>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/login" component={LogIn}/>
        <Route exact path="/help/pwreset" component={PwReset}/>
        <Route exact path="/help/pwreset/completed" component={PwResetCompleted}/>
        <Route path="/auth" component={PwResetCompleted}/>
        <Route exact path="/" component={Home}/>
        <Route exact path='/info/privacy' component={Info}/>
        <Route exact path='/info/posts' component={Info}/>
        <Route exact path='/info/replies' component={Info}/>
        <Route exact path='/qna' component={Home}/>
        <Route exact path='/forum' component={Home}/>
        <Route exact path='/write' component={Home}/>
        <Route path='/article' component={Home}/>
        <Route path='/modify' component={Home}/>
        <Route path='/delete' component={Home}/>
        <Route component={NotFound}/>
    </Switch>
);

export default Router;