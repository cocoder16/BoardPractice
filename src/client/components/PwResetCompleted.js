import React, { Fragment } from 'react';

const PwResetCompleted = ({
    newPassword
}) => {

    return (
        <Fragment>
            <p>새로 발급된 비밀번호는 {newPassword}입니다.</p>
            <p>로그인 후 바로 내 정보에서 비밀번호를 다시 변경해서 사용해주세요.</p>
        </Fragment>
    )
}

export default PwResetCompleted;