import React from 'react';
import { Link } from 'react-router-dom';

const LoggedIn = ({
    userName
}) => {
    return (
        <div>
            <p>{userName} 님 환영합니다 ^^</p>
            <ul>
                <li><Link to="/myinfo">내 정보</Link></li>
                <li><Link to="/write">글쓰기</Link></li>
                <li><Link to="/logou">로그아웃</Link></li>
            </ul>
        </div>
    )
};

export default LoggedIn;