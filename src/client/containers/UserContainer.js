import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoggedOut, LoggedIn } from '~c/components';
import * as logInActions from '~c/store/logIn';
import * as userInfoActions from '~c/store/userInfo';
import * as boardActions from '~c/store/board';
import { tryLogIn, tryLogOut } from '~c/services/users';

class UserContainer extends Component {
    handleLogOut = async () => {
        const result = await tryLogOut();
        console.log(result);
        if (result) {
            this.props.deleteUserInfo();
            this.props.deleteUserWrote();
            console.log(this.props.isLoggedIn);
            window.location.replace('/');
        }
    }

    render () {        
        const { span, onPending, isLoggedIn, userNickname } = this.props;
        const { handleInputChange, handleFormSubmit, handleLogOut } = this;
        return (     
            <div className='user-box'>
                { !isLoggedIn ?
                    <LoggedOut
                        failSpan={span} onInputChange={handleInputChange} onFormSubmit={handleFormSubmit}
                    /> :
                    <LoggedIn 
                        logOut={handleLogOut}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    id: state.logIn.id,
    pw: state.logIn.pw,
    span: state.logIn.span,
    pass: state.logIn.pass,
    onPending: state.userInfo.onPending,
    isLoggedIn: state.userInfo.isLoggedIn,
    userId: state.userInfo.id,
    userNickname: state.userInfo.nickname,
    userEmail: state.userInfo.email
})

const mapDispatchToProps = (dispatch) => ({
    inputChange: (payload) => dispatch(logInActions.inputChange(payload)),
    formValidationInput: () => dispatch(logInActions.formValidationInput()),
    logInFailed: () => dispatch(logInActions.logInFailed()),
    getUserInfo: () => dispatch(userInfoActions.getUserInfo()),
    deleteUserInfo: () => dispatch(userInfoActions.deleteUserInfo()),
    deleteUserWrote: () => dispatch(boardActions.deleteUserWrote())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);