import React, { Fragment } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import XSS from '~/modules/XSS';

const InfoRow = ({
    post, reply
    //'id title category read_count reply_count created_at'
    //'id contents created_at post_id'
}) => {

    console.log(post);
    console.log(reply);

    let category;
    if (post) {
        if (post.category == 0) category = 'Q & A';
        else if (post.category == 1) category = 'Forum';
    }

    return (    
        <Fragment>
            { post &&
                <li className='item'>
                    <div className='id'>
                        <span>{post.id}</span>
                    </div>
                    <div className='title'>
                        <Link to={`/article/${post.id}`} className='link'>{post.title}</Link>
                        { post.reply_count != 0 && <span className='reply_count'> [{post.reply_count}]</span> }
                    </div>
                    <div className='category'>{category}</div>
                    <div className='read_count'>{post.read_count}</div>
                    <div className='created_at'>{post.created_at}</div>
                </li>
            }
            { reply &&
                <li className='item'>
                    <div className='id'>
                        <span>{reply.id}</span>
                    </div>
                    <div className='contents'>
                        <Link to={`/article/${reply.post_id}#comment_${reply.id}`} className='link'>
                            {XSS.recover(reply.contents)}
                        </Link>
                    </div>
                    <div className='created_at'>{reply.created_at}</div>
                </li>
            }
        </Fragment>
    )
};

export default InfoRow;