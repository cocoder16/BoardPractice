import React from 'react';
import { Link } from 'react-router-dom';
import XSS from '~/modules/XSS';

const Reply = ({//id contents author depth parent_id is_deleted created_at
    reply, loadReplyForm, onModifyMode
}) => {
    let btnClass, marginLeft;
    
    if (reply.auth) btnClass = 'personal-btn show';
    else btnClass = 'personal-btn'

    if (reply.depth >= 5) {
        marginLeft = 100;
    } else {
        marginLeft = reply.depth * 20;
    }

    const liStyle = {
        marginLeft
    }

    return (
        <li className='reply' data-depth={reply.depth} data-id={reply.id} style={liStyle}>
            <div className='author'>
                {reply.author}
            </div>
            <div className='contents' onClick={loadReplyForm}>
                <span></span>
                {XSS.recover(reply.contents)}
            </div>
            <div className='foot'>
                <span>{reply.created_at}</span>
                <button type='button' className={btnClass} onClick={onModifyMode}>수정</button>
                <button type='button' className={btnClass}>삭제</button>
            </div>
        </li>
    );
};

export default Reply;