import React from 'react';

const PwResetCompleted = ({
    newPassword
}) => {
    return (
        <div className='pw-reset'>
            <p>The new password is <span id='new-pw'>{newPassword}</span></p>
            <p>You should change password on "management" after login.</p>
        </div>
    )
}

export default PwResetCompleted;