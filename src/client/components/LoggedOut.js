import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOut = ({
    userName, onWrite, logOut
}) => {
    return (
        <div className='logged-out'>
            <Link to="/login" className='link'>
                Log In
            </Link>
            <Link to="/signup" className='link'>
                Join
            </Link>
        </div>
    )
};

export default LoggedOut;