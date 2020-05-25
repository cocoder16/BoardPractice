import React from 'react';

const SignUpForm = ({
    spanMessage, onInputChange, onOverlapCheck, onFormSubmit
}) => {
    return (
        <form onSubmit={onFormSubmit}>
            <table><tbody>
                <tr>
                    <td>아이디</td>
                    <td>
                        <input type='text' maxLength='12' name='id'
                            onChange={onInputChange}/>
                    </td>
                    <td><input type='button' value='중복체크' name='idCheck'
                            onClick={onOverlapCheck}/>
                    <span>{spanMessage.id}</span></td>
                </tr>
                <tr>
                    <td>비밀번호</td>
                    <td>
                        <input type='password' maxLength='14' name='pw'
                            onChange={onInputChange}/>
                    </td>
                    <td><span >{spanMessage.pw}</span></td>
                </tr>
                <tr>
                    <td>비밀번호 확인</td>
                    <td>
                        <input type='password' maxLength='14' name='pwConfirm'
                            onChange={onInputChange}/>
                    </td>
                    <td><span>{spanMessage.pwConfirm}</span></td>
                </tr>
                <tr>
                    <td>닉네임</td>
                    <td>
                        <input type='text' maxLength='12' name='nickname'
                            onChange={onInputChange}/>
                    </td>
                    <td><input type='button' value='중복체크' name='nicknameCheck'
                            onClick={onOverlapCheck}/>
                    <span>{spanMessage.nickname}</span></td>
                </tr>
                <tr>
                    <td>이메일</td>
                    <td>
                        <input type='text' maxLength='40' name='email'
                            onChange={onInputChange}/>
                    </td>
                    <td><span>{spanMessage.email}</span></td>
                </tr>
            </tbody></table>
            <input type='submit' value='가입'/>
        </form>
    )
};

export default SignUpForm;