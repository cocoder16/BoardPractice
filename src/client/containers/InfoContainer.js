import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { InfoHead } from '~c/components';
import InfoBodyContainer from '~c/containers/InfoBodyContainer';
import * as logInActions from '~c/store/logIn';
import * as userInfoActions from '~c/store/userInfo';
import { tryLogIn, tryLogOut } from '~c/services/users';

class InfoContainer extends Component {
    
    render () {
        return (
            <Fragment>
                <InfoHead/>
                <InfoBodyContainer/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer);