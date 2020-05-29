import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch} from 'react-router-dom';
import { InfoBodyPrivacy, InfoBodyPosts, InfoBodyReplys } from '~c/components/index';
import SignUpContainer from './SignUpContainer';
import * as userInfoActions from '~c/store/userInfo';

class InfoBody extends Component {
    render () {
        return (
            <Switch>
                <Route exact path="/info/privacy" component={SignUpContainer}/>
                <Route exact path="/info/posts" component={InfoBodyPosts}/>
                <Route exact path="/info/replys" component={InfoBodyReplys}/>
			</Switch>
        );
    };
};

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoBody);