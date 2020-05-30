import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Home, SignUp, PwReset, PwResetCompleted, NotFound } from '~c/pages/index';

const Router = () => (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
        </ul>
        <Switch>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/help/pwreset" component={PwReset}/>
            <Route exact path="/help/pwreset/completed" component={PwResetCompleted}/>
            <Route path="/auth" component={PwResetCompleted}/>
            <Route exact path="/" component={Home}/>
            <Route exact path='/info/privacy' component={Home}/>
            <Route exact path='/info/posts' component={Home}/>
            <Route exact path='/info/replys' component={Home}/>
            {/* qna, forum url 주소창에 직접 입력하면 서버에 요청이 가니까, 거기서 해당 게시글이 있는지
            쿼리하고 만약 없다면 not found로 리다이렉트 */}
            {/* 만약 exact가 쿼리스트링을 받아들이지 못한다면?? */}
            <Route exact path='/qna' component={Home}/>
            <Route exact path='/forum' component={Home}/>
            <Route exact path='/write' component={Home}/>
            <Route path='/article' component={Home}/>
            <Route component={NotFound}/>
        </Switch>
    </div>
);

export default Router;