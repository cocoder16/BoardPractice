import React, { Fragment } from 'react';

const PwResetForm = ({
    onInputChange, onFormSubmit, spanText
}) => {

    return (
        <Fragment>
            <h2>비밀번호 재설정</h2>
            <p>비밀번호를 찾고자하는 아이디를 입력해주세요. 이메일로 본인인증을 마쳐야합니다.</p>
            <form onSubmit={onFormSubmit}>
                <input type='text' placeholder='아이디를 입력해주세요'
                    onChange={onInputChange}/>
                <input type='submit' value='다음'/>
                <span>{spanText}</span>
            </form>
        </Fragment>
    )
}

export default PwResetForm;