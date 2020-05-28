import React, {Component, Fragment} from 'react';
import SignUpContainer from '~c/containers/SignUpContainer';

class SignUp extends Component {
	render() {
		return (
			<Fragment>
				<h1>Sign Up</h1>
				<SignUpContainer/>
			</Fragment>
		);
	}
};

export default SignUp;