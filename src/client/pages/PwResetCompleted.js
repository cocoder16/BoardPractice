import React, { Component } from 'react';
import PwResetCompletedContainer from '~c/containers/PwResetCompletedContainer';
import { Route } from 'react-router-dom';

class PwResetCompleted extends Component {
    render() {
        return (
            <Route component={PwResetCompletedContainer}/>
        );
    }
};

export default PwResetCompleted;