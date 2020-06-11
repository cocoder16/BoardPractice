import React from 'react';
import { Link } from 'react-router-dom';

const BoardRow = ({//id title author read_count reply_count created_at
    post
}) => {

    return (
        <li className='item'>
            <div className='left wrap'>
                <div className='id'>
                    <span>{post.id}</span>
                </div>
                <div className='title'>
                    <Link to={`/article/${post.id}`} className='link'>{post.title}</Link>
                    { post.reply_count != 0 && <span className='reply_count'> [{post.reply_count}]</span> }
                </div>
            </div>
            <div className='right wrap'>
                <div className='author'><span>{post.author}</span></div>
                <div className='read_count'>views {post.read_count}</div>
                <div className='created_at'>{post.created_at}</div>
            </div>
        </li>
        
    )
};

export default BoardRow;