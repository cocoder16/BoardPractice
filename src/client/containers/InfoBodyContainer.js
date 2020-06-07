import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch} from 'react-router-dom';
import { InfoBody } from '~c/components';
import SignUpContainer from './SignUpContainer';
import * as userInfoActions from '~c/store/userInfo';

class InfoBodyContainer extends Component {
    render () {
        return (
            <Switch>
                <Route exact path="/info/privacy" component={SignUpContainer}/>
                <Route exact path="/info/posts" component={InfoBody}/>
                <Route exact path="/info/replys" component={InfoBody}/>
			</Switch>
        );
    };
};

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoBodyContainer);