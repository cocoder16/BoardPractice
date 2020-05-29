import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { InfoHead } from '~c/components/index';
import InfoBody from '~c/containers/InfoBody';
import * as logInActions from '~c/store/logIn';
import * as userInfoActions from '~c/store/userInfo';
import { tryLogIn, tryLogOut } from '~c/services/users';

class InfoContainer extends Component {
    
    render () {
        return (
            <Fragment>
                <InfoHead/>
                <InfoBody/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer);