import React, {Component, Fragment} from 'react';

class Home extends Component {
  render() {
    return (
        <Fragment>
          <h1 data-testid='h1tag' className='fancy-h1'>Hello React</h1>
        </Fragment>
    );
  }
};

export default Home;