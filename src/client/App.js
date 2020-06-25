import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routers/Router';
import {connect} from 'react-redux';
import { Sidebar, Footer } from '~c/components';
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
        const desktopMinWidth = 993;
        const tabletMinWidth = 769;
        if (window.innerWidth >= desktopMinWidth) this.props.setDeviceType(2);
        else if (window.innerWidth >= tabletMinWidth) this.props.setDeviceType(1);
        else this.props.setDeviceType(0);
    }

    render () {
        const { deviceType } = this.props;

        return (
            <BrowserRouter>
                <Sidebar deviceType={deviceType}/>
                <div className='main'>
                    <div className='section-wrap'>
                        <Router/>
                    </div>
                    <Footer/>
                </div>
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