import React from 'react';
import { Link } from 'react-router-dom';

const LoggedIn = ({
    onWrite, logOut
}) => {
    return (
        <div className='logged-in'>
            <Link to='/info/privacy' className='link'>
                <div className='icon'>
                    <img src='/images/InfoBtn.png' alt='info'/>
                </div>
            </Link>
            <button type='button' onClick={logOut}>
                <div className='icon'>
                    <img src='/images/LogoutBtn.png' alt='logout'/>
                </div>
            </button>
        </div>
    )
};

export default LoggedIn;