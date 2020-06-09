import React, {Component, Fragment} from 'react';
import LogInContainer from '~c/containers/LogInContainer';

class LogIn extends Component {
	render() {
		return (
			<Fragment>
				<h1>Log In</h1>
				<LogInContainer/>
			</Fragment>
		);
	}
};

export default LogIn;