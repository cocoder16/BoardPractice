import React, { Component } from 'react';
import LogInContainer from '~c/containers/LogInContainer';
import { Route } from 'react-router-dom';

class LogIn extends Component {
	render() {
		return (
			<Route component={LogInContainer}/>
		);
	}
};

export default LogIn;