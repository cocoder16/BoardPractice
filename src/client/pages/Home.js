import React, {Component, Fragment} from 'react';
import UserContainer from '~c/containers/UserContainer';

class Home extends Component {
  	render() {
    	return (
        	<Fragment>
        		<h1 data-testid='h1tag' className='fancy-h1'>Hello React</h1>
          		<UserContainer/>
        	</Fragment>
    	);
  	}
};

export default Home;