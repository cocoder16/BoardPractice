import React from 'react';
import { Link } from 'react-router-dom';

const BoardRow = ({//id title author read_count reply_count created_at
    post
}) => {
    return (
        <li className='item'>
            <div>
                <span>{post.id}</span>
            </div>
            <div>
                <h3>
                    <Link to={`article/${post.id}`}>{post.title}</Link>
                </h3>
                <span> [{post.reply_count}]</span>
            </div>
            <div>{post.author}</div>
            <div>
                <div>{post.read_count}</div>
                <div>{post.created_at}</div>
            </div>
        </li>
        
    )
};

export default BoardRow;