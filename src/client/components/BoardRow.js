import React from 'react';
import { Link } from 'react-router-dom';

const BoardRow = ({//id title author read_count reply_count created_at
    post
}) => {
    return (
        <li className='item'>
            <div className='id'>
                <span>{post.id}</span>
            </div>
            <div className='title'>
                <h3>
                    <Link to={`article/${post.id}`} className='link'>{post.title}</Link>
                </h3>
                <span className='reply_count'> [{post.reply_count}]</span>
            </div>
            <div className='author'>{post.author}</div>
            <div className='read_count'>{post.read_count}</div>
            <div className='created_at'>{post.created_at}</div>
        </li>
        
    )
};

export default BoardRow;