import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as signUpActions from '~c/store/signUp';
import { createUser } from '~c/services/users';

class SignUpForm extends Component {
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
        const { span } = this.props;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <table><tbody>
                    <tr>
                        <td data-testid='fh_id'>아이디</td>
                        <td>
                            <input data-testid='input_id' type='text' maxLength='12' name='id'
                                onChange={this.handleInputChange}/>
                        </td>
                        <td><input data-testid='btn_idConfirm' type='button' value='중복체크' name='idCheck'
                                onClick={this.overlapCheck}/>
                        <span data-testid='span_idCheck'>{span.id}</span></td>
                    </tr>
                    <tr>
                        <td data-testid='fh_pw'>비밀번호</td>
                        <td>
                            <input data-testid='input_pw' type='password' maxLength='14' name='pw'
                                onChange={this.handleInputChange}/>
                        </td>
                        <td><span data-testid='span_pwCheck'>{span.pw}</span></td>
                    </tr>
                    <tr>
                        <td data-testid='fh_pwConfirm'>비밀번호 확인</td>
                        <td>
                            <input data-testid='input_pwConfirm' type='password' maxLength='14' name='pwConfirm'
                                onChange={this.handleInputChange}/>
                        </td>
                        <td><span data-testid='span_pwConfirmCheck'>{span.pwConfirm}</span></td>
                    </tr>
                    <tr>
                        <td data-testid='fh_nick'>닉네임</td>
                        <td>
                            <input data-testid='input_nick' type='text' maxLength='12' name='nickname'
                                onChange={this.handleInputChange}/>
                        </td>
                        <td><input data-testid='btn_nickConfirm' type='button' value='중복체크' name='nicknameCheck'
                                onClick={this.overlapCheck}/>
                        <span data-testid='span_nickCheck'>{span.nickname}</span></td>
                    </tr>
                    <tr>
                        <td data-testid='fh_email'>이메일</td>
                        <td>
                            <input data-testid='input_email' type='text' maxLength='40' name='email'
                                onChange={this.handleInputChange}/>
                        </td>
                        <td><span data-testid='span_emailCheck'>{span.email}</span></td>
                    </tr>
                </tbody></table>
                <input data-testid='btn_submit' type='submit' value='가입'/>
            </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);