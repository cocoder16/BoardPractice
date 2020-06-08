import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { InfoList } from '~c/components';
import SignUpContainer from '~c/containers/SignUpContainer';

const InfoBody = ({
    posts, replies
}) => {
    return (
        <Switch>
            <Route exact path="/info/privacy" component={SignUpContainer}/>
            <Route exact path="/info/posts"
                render={() => <InfoList posts={posts}/>}
            />
            <Route exact path="/info/replies" 
                render={() => <InfoList replies={replies}/>}
            />
        </Switch>
    );
};

export default InfoBody;