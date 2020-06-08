import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LogInForm, LoggedIn } from '~c/components';
import * as logInActions from '~c/store/logIn';
import * as userInfoActions from '~c/store/userInfo';
import * as boardActions from '~c/store/board';
import { tryLogIn, tryLogOut } from '~c/services/users';

class UserContainer extends Component {
    componentDidMount () {
        sessionStorage.removeItem('received newPw');
        sessionStorage.removeItem('sent email');
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.props.inputChange({name: name, value: value});
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();

        await this.props.formValidationInput();
        if (!this.props.pass) {
            console.log('fail form validation due to input value');
            return false;
        }

        const { id, pw } = this.props;
        const formData = new FormData();
        formData.append('id', id);
        formData.append('pw', pw);
        const data = await tryLogIn(formData);
        if (data.result) {
            this.props.getUserInfo();
        } else {
            this.props.logInFailed();
        }
    }

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
        let target;

        if (onPending) target = null;
        else {
            if (!isLoggedIn) {
                target = <LogInForm
                    failSpan={span} onInputChange={handleInputChange} onFormSubmit={handleFormSubmit}
                />;
            } else {
                target = <LoggedIn 
                    userName={userNickname} logOut={handleLogOut}
                />;
            }
        }

        return (
            <div>
                {target}
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