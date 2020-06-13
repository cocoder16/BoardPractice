import React from 'react';

const ReplyForm = ({
    onChange, onSubmit, possibleCancel, clear
}) => {

    return (
        <div className='reply-form'>
            <form onSubmit={onSubmit}>
                <textarea name='contents' className='contents' maxLength='4000'
                    onChange={onChange}></textarea>
                <button type='submit'>Post</button>
                { possibleCancel && <button type='button' onClick={clear}>Cancel</button> }
            </form>
        </div>
    )
}

export default ReplyForm;