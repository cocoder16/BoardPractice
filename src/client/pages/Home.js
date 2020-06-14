import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import InfoContainer from '~c/containers/InfoContainer';
import BoardContainer from '~c/containers/BoardContainer';

class Home extends Component {
  	render() {
    	return (
        	<Fragment>
				<Switch>
					<Route exact path="/" component={BoardContainer}/>
					<Route path='/info' component={InfoContainer}/>
					<Route exact path='/qna' component={BoardContainer}/>
					<Route exact path='/forum' component={BoardContainer}/>
					<Route path='/article' component={BoardContainer}/>
					<Route exact path='/write' component={BoardContainer}/>
					<Route path='/modify' component={BoardContainer}/>
					<Route path='/delete' component={BoardContainer}/>
				</Switch>
        	</Fragment>
    	);
  	}
};

export default Home;