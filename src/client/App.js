import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Router from './routers/Router';
import {connect} from 'react-redux';
import { Sidebar } from '~c/components';
import * as userInfoActions from '~c/store/userInfo';
import * as viewportActions from '~c/store/viewport';

class App extends Component {
    constructor (props) {
        super(props);
        this.props.getUserInfo();
        this.setDeviceType();
        window.addEventListener('resize', this.setDeviceType);
    }

    setDeviceType = () => {
        if (window.innerWidth > 992) this.props.setDeviceType(2);
        else if (window.innerWidth > 768) this.props.setDeviceType(1);
        else this.props.setDeviceType(0);
    }

    render () {
        const { deviceType } = this.props;

        return (
            <BrowserRouter>
                <Sidebar deviceType={deviceType}/>
                <Router/>
            </BrowserRouter>
        );
    }
};

const mapStateToProps = (state) => ({
    deviceType: state.viewport.type
})

const mapDispatchToProps = (dispatch) => ({
    getUserInfo: (payload) => dispatch(userInfoActions.getUserInfo(payload)),
    setDeviceType: (payload) => dispatch(viewportActions.setDeviceType(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);