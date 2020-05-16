import React, {Component} from 'react';

class Home extends Component {
  render() {
    return (
        <h1 data-testid='h1tag' className='fancy-h1'>Hello React</h1>
    );
  }
};

export default Home;