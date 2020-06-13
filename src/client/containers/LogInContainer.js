import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LogInForm } from '~c/components';
import * as logInActions from '~c/store/logIn';
import * as userInfoActions from '~c/store/userInfo';
import { tryLogIn } from '~c/services/users';

class UserContainer extends Component {
    componentDidMount () {
        sessionStorage.removeItem('received newPw');
        sessionStorage.removeItem('sent email');
    }
    
    componentDidUpdate () {
        console.log(this.props.isLoggedIn);
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
            window.location.replace('/');
        } else {
            this.props.logInFailed();
        }
    }

    render () {        
        const { span } = this.props;
        const { handleInputChange, handleFormSubmit } = this;

        return (
            <LogInForm
                failSpan={span} 
                onInputChange={handleInputChange} onFormSubmit={handleFormSubmit}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    id: state.logIn.id,
    pw: state.logIn.pw,
    span: state.logIn.span,
    pass: state.logIn.pass,
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
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);