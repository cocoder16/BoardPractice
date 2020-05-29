import React, {Component, Fragment} from 'react';
import { Route, Switch} from 'react-router-dom';
import UserContainer from '~c/containers/UserContainer';
import InfoContainer from '~c/containers/InfoContainer';

class Home extends Component {
  	render() {
    	return (
        	<Fragment>
        		<h1 data-testid='h1tag' className='fancy-h1'>Hello React</h1>
          		<UserContainer/>
				<Switch>
					{/* <Route path="/" component={Summary}/> */}
					<Route path="/info" component={InfoContainer}/>
				</Switch>
        	</Fragment>
    	);
  	}
};

export default Home;