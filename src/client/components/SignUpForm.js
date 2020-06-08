import React from 'react';

const SignUpForm = ({
    spanMessage, onInputChange, onOverlapCheck, onFormSubmit, isModify, 
    onDeleteMode, isDeleteMode, onDelete, deleteFailedMessage
}) => {
    let idDisabled, idOverlap, submitValue, deleteUser;
    if (isModify) {
        idDisabled = true;
        idOverlap = <td></td>;
        submitValue = '수정'
        deleteUser = true;
    } else {
        idDisabled = false;
        idOverlap = <td><input type='button' value='중복체크' name='idCheck' onClick={onOverlapCheck}/>
            <span>{spanMessage.id}</span></td>;
        submitValue = '가입'
    }

    const template = 
        <form onSubmit={onFormSubmit}>
            <table><tbody>
                <tr>
                    <td>아이디</td>
                    <td>
                        <input type='text' maxLength='12' name='id'
                            onChange={onInputChange} disabled={idDisabled}/>
                    </td>
                    {idOverlap}
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
            <input type='submit' value={submitValue}/>
        </form>

    return (
        <div>
            {template}
            { deleteUser && <input type='button' value='회원탈퇴' onClick={onDeleteMode}/> }
            { (deleteUser && isDeleteMode) && 
                <form onSubmit={onDelete}>
                    <span>정말로 회원탈퇴를 하시겠습니까?</span>
                    <input type='password' className='pw' maxLength='14'
                        placeholder='비밀번호 재확인이 필요합니다.'/>
                    <span>{deleteFailedMessage}</span><br/>
                    <input type='submit' value='삭제'/>
                </form>
            }
        </div>
    )
};

export default SignUpForm;