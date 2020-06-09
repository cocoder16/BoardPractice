import React from 'react';

const SignUpForm = ({
    spanMessage, onInputChange, onOverlapCheck, onFormSubmit, isModify, 
    onDeleteMode, isDeleteMode, onDelete, deleteFailedMessage
}) => {
    let idDisabled, idOverlap, submitValue, deleteUser, messageId;
    if (isModify) {
        idDisabled = true;
        idOverlap = null;
        messageId = <span></span>
        submitValue = 'save'
        deleteUser = true;
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
            <button type='submit'>{submitValue}</button>
        </form>

    return (
        <div className='sign-up-form'>
            <h2>Sign Up</h2>
            {template}
            { deleteUser && <input type='button' value='Remove Acocount' onClick={onDeleteMode}/> }
            { (deleteUser && isDeleteMode) && 
                <form onSubmit={onDelete}>
                    <span>Are you sure you would like to remove this account?</span>
                    <input type='password' className='pw' maxLength='14'
                        placeholder='Input Password again.'/>
                    <span>{deleteFailedMessage}</span><br/>
                    <input type='submit' value='Delete'/>
                </form>
            }
        </div>
    )
};

export default SignUpForm;