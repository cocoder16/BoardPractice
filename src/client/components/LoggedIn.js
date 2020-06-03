import React from 'react';
import { Link } from 'react-router-dom';

const LoggedIn = ({
    userName, onWrite, logOut
}) => {
    return (
        <div>
            <p>{userName} 님 환영합니다 ^^</p>
            <ul>
                <Link to='/info/privacy' className='link'><li>내 정보</li></Link>
                <li onClick={logOut}>로그아웃</li>
            </ul>
        </div>
    )
};

export default LoggedIn;