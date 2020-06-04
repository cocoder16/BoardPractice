import React, { Fragment } from 'react';

const ReplyForm = ({
    onChange, onSubmit
}) => {

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <textarea name='contents' maxLength='4000' onChange={onChange}></textarea>
                <input type='submit' value='등록'/>
            </form>
        </Fragment>
    )
}

export default ReplyForm;