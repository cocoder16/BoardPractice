import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import InfoContainer from '~c/containers/InfoContainer';

class Info extends Component {
  	render() {
    	return (
			<Route component={InfoContainer}/>
    	);
  	}
};

export default Info;