import React, {Component, Fragment} from 'react';
import LogInContainer from '~c/containers/LogInContainer';

class Home extends Component {
  render() {
    return (
        <Fragment>
          <h1 data-testid='h1tag' className='fancy-h1'>Hello React</h1>
          <LogInContainer/>
        </Fragment>
    );
  }
};

export default Home;