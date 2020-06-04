import React, { Fragment } from 'react';
import { Reply } from './index';

const ReplyList = ({
    replies, 
}) => {
    console.log(replies);
    return (
        <ul className='replies'>
            {replies.map((cur, i) => <Reply 
                reply={cur} 
                key={i}
            />)}
        </ul>
    )
}

export default ReplyList;