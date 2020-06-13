import React from 'react';
import { Link } from 'react-router-dom';

const LoggedIn = ({
    logOut, deviceType
}) => {

    return (
        <div className='logged-in'>
            <Link to='/info/privacy' className='link'>
                <div className='icon'>
                    <img src='/images/InfoBtn.png' alt='info'/>
                    {deviceType > 0 && <span>Your Info</span>}
                </div>
            </Link>
            <button type='button' onClick={logOut}>
                <div className='icon'>
                    <img src='/images/LogoutBtn.png' alt='logout'/>
                    {deviceType > 0 && <span>LogOut</span>}
                </div>
            </button>
        </div>
    )
};

export default LoggedIn;