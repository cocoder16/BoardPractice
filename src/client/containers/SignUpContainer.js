import React, { Component } from 'react';
import {connect} from 'react-redux';
import SignUpForm from '~c/components/SignUpForm';
import * as signUpActions from '~c/store/signUp';
import { createUser } from '~c/services/users';

class SignUpContainer extends Component {
    handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.props.inputChange({name: name, value: value});
    }

    overlapCheck = async (e) => {
        const { name } = e.target;
        await this.props.beforeOverlapCheck(name);
        if (!this.props.goOverlapCheck) return null;
        this.props.overlapCheck(name);
    }

    alertReject () {
        alert('가입 양식을 다시 확인해주세요.');
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();

        await this.props.formValidationInput();
        if (!this.props.pass) {
            console.log('fail form validation due to input value');
            this.alertReject();
            return false;
        }

        await this.props.formValidationOverlap();
        if (!this.props.pass) {
            console.log('fail form validation due to overlap');
            this.alertReject();
            return false;
        }

        const { id, pw, nickname, email } = this.props;
        const formData = new FormData();
        formData.append('id', id);
        formData.append('pw', pw);
        formData.append('nickname', nickname);
        formData.append('email', email);
        await createUser(formData);
    }

    render() {
        const { handleInputChange, overlapCheck, handleFormSubmit } = this;
        const { span } = this.props;

        return (
            <SignUpForm
                spanMessage={span}
                onInputChange={handleInputChange}
                onOverlapCheck={overlapCheck}
                onFormSubmit={handleFormSubmit} 
            />
        )
    }
}

//props값으로 넣어줄 상태 정의
const mapStateToProps = (state) => ({
    id: state.signUp.id,
    pw: state.signUp.pw,
    pwConfirm: state.signUp.pwConfirm,
    nickname: state.signUp.nickname,
    email: state.signUp.email,
    span: {
        id: state.signUp.span.id,
        pw: state.signUp.span.pw,
        pwConfirm: state.signUp.span.pwConfirm,
        nickname: state.signUp.span.nickname,
        email: state.signUp.span.email
    },
    goOverlapCheck: state.signUp.goOverlapCheck,
    pass: state.signUp.pass
})

//props값으로 넣어줄 액션 함수들 정의
const mapDispatchToProps = (dispatch) => ({
    inputChange: (payload) => dispatch(signUpActions.inputChange(payload)),
    beforeOverlapCheck: (payload) => dispatch(signUpActions.beforeOverlapCheck(payload)),
    overlapCheck: (name) => dispatch(signUpActions.overlapCheck(name)),
    formValidationInput: () => dispatch(signUpActions.formValidationInput()),
    formValidationOverlap: () => dispatch(signUpActions.formValidationOverlap())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);