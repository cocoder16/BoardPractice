import React from 'react';

const SignUpForm = ({
    spanMessage, onInputChange, onOverlapCheck, onFormSubmit, isModify, 
    onDeleteMode, isDeleteMode, onDelete, deleteFailedMessage
}) => {
    let idDisabled, idOverlap, submitValue, messageId;
    if (isModify) {
        idDisabled = true;
        idOverlap = null;
        messageId = <span></span>
        submitValue = 'save'
    } else {
        idDisabled = false;
        idOverlap = <button type='button' name='idCheck' onClick={onOverlapCheck}>Check Availability</button>;
        messageId = <span>{spanMessage.id}</span>;
        submitValue = 'Register'
    }

    const template = 
        <form onSubmit={onFormSubmit}>
            <p>ID</p>
            <input type='text' maxLength='12' name='id'
                onChange={onInputChange} disabled={idDisabled}
            />
            {idOverlap}
            <div className='fail-message'>
                {messageId}
            </div>
            <p>Password</p>
            <input type='password' maxLength='14' name='pw'
                onChange={onInputChange}
            />
            <div className='fail-message'>
                <span >{spanMessage.pw}</span>
            </div>
            <p>Confirm Password</p>
            <input type='password' maxLength='14' name='pwConfirm'
                onChange={onInputChange}
            />
            <div className='fail-message'>
                <span>{spanMessage.pwConfirm}</span>
            </div>
            <p>Nickname</p>
            <input type='text' maxLength='12' name='nickname'
                onChange={onInputChange}
            />
            <button type='button' name='nicknameCheck' onClick={onOverlapCheck}>Check Availability</button>
            <div className='fail-message'>
                <span>{spanMessage.nickname}</span>
            </div>
            <p>Email</p>
            <input type='text' maxLength='40' name='email'
                onChange={onInputChange}
            />
            <div className='fail-message'>
                <span>{spanMessage.email}</span>
            </div>
            <button type='submit' className='submit'>{submitValue}</button>
        </form>

    return (
        <div className='sign-up-form'>
            { !isModify ? <h2>Sign Up</h2> : <h2>Management</h2> }
            {template}
            { isModify &&
                <button type='button' className='remove-btn' 
                    onClick={onDeleteMode}
                >Remove Acocount</button>
            }
            { (isModify && isDeleteMode) ?
                <form onSubmit={onDelete} className='delete-form'>
                    <span>Are you sure you would like to remove this account?</span>
                    <input type='password' className='pw' maxLength='14'
                        placeholder='Input Password again.'/>
                    <span className='fail-message'>{deleteFailedMessage}</span><br/>
                    <button type='submit'>Delete</button>
                </form> :
                <div className='block'></div>
            }
        </div>
    )
};

export default SignUpForm;