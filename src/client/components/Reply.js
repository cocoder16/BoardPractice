import React from 'react';
import { Link } from 'react-router-dom';

const Reply = ({//id contents author parent_id created_at
    reply, 
}) => {
    let btnClass;
    // if (auth) btnClass = 'personal-btn show';
    // else btnClass = 'personal-btn'

    return (
        <li className='reply'>
            <div className='author'>
                {reply.author}
            </div>
            <div className='contents'>
                {reply.contents}
            </div>
            <div className='foot'>
                <span>{reply.created_at}</span>
                <button className={btnClass}>수정</button>
                <button className={btnClass}>삭제</button>
            </div>
        </li>
    );
};

export default Reply;