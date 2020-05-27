import React from 'react';

const LoggedIn = ({
    userName, onInfo, onWrite, logOut
}) => {
    return (
        <div>
            <p>{userName} 님 환영합니다 ^^</p>
            <ul>
                <li onClick={onInfo}>내 정보</li>
                <li onClick={onWrite}>글쓰기</li>
                <li onClick={logOut}>로그아웃</li>
            </ul>
        </div>
    )
};

export default LoggedIn;