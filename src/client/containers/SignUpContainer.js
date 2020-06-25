import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SignUpForm } from '~c/components';
import * as signUpActions from '~c/store/signUp';
import * as userInfoActions from '~c/store/userInfo';
import { createUser, updateUser, deleteUser } from '~c/services/users';

class SignUpContainer extends Component {
    constructor (props) {
        super(props);
        if (location.pathname == '/info/privacy') {
            this.props.setIsModify(true);
            if (!this.props.onPending) {
                this.props.getUserInfo();
            }
        } else {
            this.props.setIsModify(false);
        }
    }

    componentDidUpdate (prevProps, prevState) {
        if ((prevProps.onPending && !this.props.onPending)) {
            document.getElementsByName('id')[0].value = this.props.userId;
            document.getElementsByName('nickname')[0].value = this.props.userNickname;
            document.getElementsByName('email')[0].value = this.props.userEmail;
            this.props.setInputValue({
                id: this.props.userId, 
                nickname: this.props.userNickname, 
                email: this.props.userEmail
            });
        }
    }

    componentWillUnmount () {
        this.props.clear();
        this.props.turnOffDeleteMode();
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
        alert('Please check the form again.');
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const { isModify } = this.props;

        await this.props.formValidationInput();
        if (!this.props.pass) {
            this.alertReject();
            return null;
        }

        await this.props.formValidationOverlap();
        if (!this.props.pass) {
            this.alertReject();
            return null;
        }

        const { id, pw, nickname, email } = this.props;
        const formData = new FormData();
        formData.append('pw', pw);
        formData.append('nickname', nickname);
        formData.append('email', email);

        if (!isModify) {
            formData.append('id', id);
            await createUser(formData);
        }
        else await updateUser(formData);
        this.props.history.push('/');
    }

    turnOnDeleteMode = (e) => {
        e.preventDefault();
        this.props.turnOnDeleteMode();
    }

    handleDelete = async (e) => {
        e.preventDefault();
        const pw = e.target.querySelector('.pw').value;

        await this.props.pwValidation(pw);
        
        if (this.props.deleteFailedMessage == '') {
            const formData = new FormData();
            formData.append('pw', pw);
            const result = await deleteUser(formData);
            if (result == true) {
                alert('Your account is deleted.');
                this.props.deleteUserInfo();
                this.props.history.push('/');
            } else {
                this.props.deleteFailed();
            }
        }
    }

    render() {
        const { handleInputChange, overlapCheck, handleFormSubmit, turnOnDeleteMode, handleDelete } = this;
        const { span, isModify, isDeleteMode, deleteFailedMessage } = this.props;

        return (
            <SignUpForm
                spanMessage={span}
                onInputChange={handleInputChange}
                onOverlapCheck={overlapCheck}
                onFormSubmit={handleFormSubmit} 
                isModify={isModify}
                onDeleteMode={turnOnDeleteMode}
                isDeleteMode={isDeleteMode}
                onDelete={handleDelete}
                deleteFailedMessage={deleteFailedMessage}
            />
        )
    }
}

//props값으로 넣어줄 상태 정의
const mapStateToProps = (state) => ({
    id: state.signUp.id,
    pw: state.signUp.pw,
    nickname: state.signUp.nickname,
    email: state.signUp.email,
    span: state.signUp.span,
    goOverlapCheck: state.signUp.goOverlapCheck,
    pass: state.signUp.pass,
    isModify: state.signUp.isModify,
    userId: state.userInfo.id,
    userNickname: state.userInfo.nickname,
    userEmail: state.userInfo.email,
    onPending: state.userInfo.onPending,
    isDeleteMode: state.signUp.isDeleteMode,
    deleteFailedMessage: state.signUp.deleteFailedMessage,
})

//props값으로 넣어줄 액션 함수들 정의
const mapDispatchToProps = (dispatch) => ({
    inputChange: (payload) => dispatch(signUpActions.inputChange(payload)),
    beforeOverlapCheck: (name) => dispatch(signUpActions.beforeOverlapCheck(name)),
    overlapCheck: (name) => dispatch(signUpActions.overlapCheck(name)),
    formValidationInput: () => dispatch(signUpActions.formValidationInput()),
    formValidationOverlap: () => dispatch(signUpActions.formValidationOverlap()),
    setIsModify: (isModify) => dispatch(signUpActions.setIsModify(isModify)),
    setInputValue: (payload) => dispatch(signUpActions.setInputValue(payload)),
    clear: () => dispatch(signUpActions.clear()),
    getUserInfo: (payload) => dispatch(userInfoActions.getUserInfo(payload)),
    turnOnDeleteMode: () => dispatch(signUpActions.turnOnDeleteMode()),
    turnOffDeleteMode: () => dispatch(signUpActions.turnOffDeleteMode()),
    deleteFailed: () => dispatch(signUpActions.deleteFailed()),
    deleteUserInfo: () => dispatch(userInfoActions.deleteUserInfo()),
    pwValidation: (pw) => dispatch(signUpActions.pwValidation(pw))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);