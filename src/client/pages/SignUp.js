import React, {Component, Fragment} from 'react';

import SignUpForm from '~c/containers/SignUpForm';

class SignUp extends Component {
  render() {
    return (
      <Fragment>
        <h1>Sign Up</h1>
        <SignUpForm/>
      </Fragment>
    );
  }
};

export default SignUp;