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
					{/* 페이지는 쿼리스트링으로 */}
					<Route exact path='/qna' component={BoardContainer}/>
					<Route exact path='/forum' component={BoardContainer}/>
					{/* 모든 게시글은 article url로 통합 post 모델로 관리 */}
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