import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import BoardContainer from '~c/containers/BoardContainer';

class Home extends Component {
  	render() {
    	return (
			<Switch>
				<Route exact path="/" component={BoardContainer}/>
				<Route exact path='/qna' component={BoardContainer}/>
				<Route exact path='/forum' component={BoardContainer}/>
				<Route path='/article' component={BoardContainer}/>
				<Route exact path='/write' component={BoardContainer}/>
				<Route path='/modify' component={BoardContainer}/>
				<Route path='/delete' component={BoardContainer}/>
			</Switch>
    	);
  	}
};

export default Home;