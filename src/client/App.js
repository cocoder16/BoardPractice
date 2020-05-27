import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routers/Router';
import {connect} from 'react-redux';
import UserContainer from '~c/containers/UserContainer';
import * as userInfoActions from '~c/store/userInfo';

class App extends Component {
    constructor (props) {
        super(props);
        this.props.getUserInfo();
    }

    render () {
        return (
            <div>
                <BrowserRouter>
                    <UserContainer/>
                    <Router/>
                </BrowserRouter>
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    getUserInfo: (payload) => dispatch(userInfoActions.getUserInfo(payload))
})

export default connect(null, mapDispatchToProps)(App);