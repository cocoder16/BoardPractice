import React, { Component } from 'react';
import {connect} from 'react-redux';
import LogInForm from '~c/components/LogInForm';
import LoggedIn from '~c/components/LoggedIn';
import * as logInActions from '~c/store/logIn';
import * as userInfoActions from '~c/store/userInfo';
import { tryLogIn } from '~c/services/users';

class LogInContainer extends Component {
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
        console.log(data);
        if (data.result) {
            this.props.logInSuccessful();
            this.props.userInfoSet(data.userInfo);
        } else {
            this.props.logInFailed();
        }
    }

    render() {
        const { span, isLoggedIn, userNickname } = this.props;
        const { handleInputChange, handleFormSubmit } = this;
        let target;

        if (!isLoggedIn) {
            target = <LogInForm
                failSpan={span} onInputChange={handleInputChange} onFormSubmit={handleFormSubmit}
            />;
        } else {
            target = <LoggedIn userName={userNickname}/>;
        }

        return (
            <div>
                {target}
            </div>
        );
    }
}

//props값으로 넣어줄 상태 정의
const mapStateToProps = (state) => ({
    id: state.logIn.id,
    pw: state.logIn.pw,
    span: state.logIn.span,
    pass: state.logIn.pass,
    isLoggedIn: state.logIn.isLoggedIn,
    userId: state.userInfo.id,
    userNickname: state.userInfo.nickname,
    userEmail: state.userInfo.email
})

//props값으로 넣어줄 액션 함수들 정의
const mapDispatchToProps = (dispatch) => ({
    inputChange: (payload) => dispatch(logInActions.inputChange(payload)),
    formValidationInput: () => dispatch(logInActions.formValidationInput()),
    logInFailed: () => dispatch(logInActions.logInFailed()),
    logInSuccessful: () => dispatch(logInActions.logInSuccessful()),
    userInfoSet: (payload) => dispatch(userInfoActions.userInfoSet(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(LogInContainer);