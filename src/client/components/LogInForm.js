import React from 'react';
import { Link } from 'react-router-dom';

const LogInForm = ({
    failSpan, onInputChange, onFormSubmit
}) => {
    return (
        <div className='log-in-form'>
            <h2>Login</h2>
            <form onSubmit={onFormSubmit}>
                <p>ID</p>
                <input type='text' maxLength='12' name='id'
                    onChange={onInputChange}/>
                <p>Password</p>
                <input type='password' maxLength='12' name='pw'
                    onChange={onInputChange}/>
                <div className='fail-message'>
                    <span>{failSpan}</span>
                </div>
                <button type='submit'>Log In</button>
            </form>
            <Link to="/signup" className='link'>Sign Up</Link>
            <div className='blank'></div>
            <Link to="/help/pwreset" className='link'>Reset Password</Link>
        </div>
    )
};

export default LogInForm;