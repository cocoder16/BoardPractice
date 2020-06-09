import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Router from './routers/Router';
import {connect} from 'react-redux';
import { Sidebar } from '~c/components';
import * as userInfoActions from '~c/store/userInfo';

class App extends Component {
    constructor (props) {
        super(props);
        this.props.getUserInfo();
    }

    render () {
        return (
            <BrowserRouter>
                <Sidebar/>
                <Router/>
            </BrowserRouter>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    getUserInfo: (payload) => dispatch(userInfoActions.getUserInfo(payload))
})

export default connect(null, mapDispatchToProps)(App);