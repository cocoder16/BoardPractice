import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SignUpForm } from '~c/components';
import * as signUpActions from '~c/store/signUp';
import * as userInfoActions from '~c/store/userInfo';
import { createUser, updateUser } from '~c/services/users';

class SignUpContainer extends Component {
    constructor (props) {
        super(props);
        if (location.pathname == '/signup') {
            this.props.setIsModify(false);
        }
        if (location.pathname == '/info/privacy') {
            this.props.setIsModify(true);
            if (!this.props.onPending) {
                this.props.getUserInfo();
            }
        }
    }

    componentDidUpdate (prevProps, prevState) {
        console.log(prevProps.onPending);
        console.log(this.props.onPending);
        if ((prevProps.onPending && !this.props.onPending)) {
            document.getElementsByName('id')[0].value = this.props.userId;
            document.getElementsByName('nickname')[0].value = this.props.userNickname;
            document.getElementsByName('email')[0].value = this.props.userEmail;
            this.props.setInputValue({id: this.props.userId, nickname: this.props.userNickname, 
            email: this.props.userEmail});
        }
    }

    componentWillUnmount () {
        this.props.clear();
    }

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
        const { isModify } = this.props;

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

        if (!isModify) createUser(formData);
        else updateUser(formData);
    }

    render() {
        const { handleInputChange, overlapCheck, handleFormSubmit } = this;
        const { span, isModify } = this.props;

        return (
            <SignUpForm
                spanMessage={span}
                onInputChange={handleInputChange}
                onOverlapCheck={overlapCheck}
                onFormSubmit={handleFormSubmit} 
                isModify={isModify}
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
    pass: state.signUp.pass,
    isModify: state.signUp.isModify,
    userId: state.userInfo.id,
    userNickname: state.userInfo.nickname,
    userEmail: state.userInfo.email,
    onPending: state.userInfo.onPending,
})

//props값으로 넣어줄 액션 함수들 정의
const mapDispatchToProps = (dispatch) => ({
    inputChange: (payload) => dispatch(signUpActions.inputChange(payload)),
    beforeOverlapCheck: (payload) => dispatch(signUpActions.beforeOverlapCheck(payload)),
    overlapCheck: (payload) => dispatch(signUpActions.overlapCheck(payload)),
    formValidationInput: () => dispatch(signUpActions.formValidationInput()),
    formValidationOverlap: () => dispatch(signUpActions.formValidationOverlap()),
    setIsModify: (payload) => dispatch(signUpActions.setIsModify(payload)),
    setInputValue: (payload) => dispatch(signUpActions.setInputValue(payload)),
    clear: () => dispatch(signUpActions.clear()),

    getUserInfo: (payload) => dispatch(userInfoActions.getUserInfo(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);