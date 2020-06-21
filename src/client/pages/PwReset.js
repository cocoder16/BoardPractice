import React, { Component } from 'react';
import PwResetContainer from '~c/containers/PwResetContainer';
import { Route } from 'react-router-dom';

class PwReset extends Component {
    render() {
        return (
            <Route component={PwResetContainer}/>
        );
    }
};

export default PwReset;