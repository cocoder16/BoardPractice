import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOut = ({
    userName, onWrite, logOut, deviceType
}) => {
    return (
        <div className='logged-out'>
            <Link to="/login" className='link'>
                <div className='icon'>
                    {deviceType > 0 && <img src='/images/LoginBtn.png' alt='Login'/>}
                    <span>Login</span>
                </div>
            </Link>
            <Link to="/signup" className='link'>
                <div className='icon'>
                    {deviceType > 0 && <img src='/images/SignupBtn.png' alt='Login'/>}
                    <span>Join</span>
                </div>
            </Link>
        </div>
    )
};

export default LoggedOut;