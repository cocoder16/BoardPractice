import React from 'react';

const PwResetForm = ({
    onInputChange, onFormSubmit, spanText
}) => {

    return (
        <div className='pw-reset'>
            <h2>Do you want to reset password?</h2>
            <p>Input your ID for reset password. Then a email will be sent to verify your identity.</p>
            <form onSubmit={onFormSubmit}>
                <input type='text' placeholder='Your ID is required.' autoFocus
                    onChange={onInputChange}
                />
                <button type='submit'>Next</button>
                <span id='fail-find-id-message'>{spanText}</span>
            </form>
        </div>
    )
}

export default PwResetForm;