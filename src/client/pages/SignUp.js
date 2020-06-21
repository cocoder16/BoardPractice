import React, { Component } from 'react';
import SignUpContainer from '~c/containers/SignUpContainer';
import { Route } from 'react-router-dom';

class SignUp extends Component {
	render() {
		return (
			<Route component={SignUpContainer}/>
		);
	}
};

export default SignUp;