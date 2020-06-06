import React, { Fragment } from 'react';

const ReplyForm = ({
    onChange, onSubmit, possibleCancel, clear
}) => {

    return (
        <div className='reply-form'>
            <form onSubmit={onSubmit}>
                <textarea name='contents' className='contents' maxLength='4000'
                    onChange={onChange}></textarea>
                <input type='submit' value='등록'/>
                { possibleCancel && <input type='button' value='취소' onClick={clear}/> }
            </form>
        </div>
    )
}

export default ReplyForm;