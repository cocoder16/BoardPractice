import React from 'react';
import { Link } from 'react-router-dom';
import XSS from '~/modules/XSS';

const Reply = ({//id contents author author_id depth parent_id is_deleted created_at
    reply, loadReplyForm, onModifyMode, onDeleteMode, isDeleteMode, offDeleteMode, onDelete
}) => {
    let btnClass, marginLeft;
    
    if (reply.auth && !reply.is_deleted) btnClass = 'personal-btn show';
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
        <li className='reply' data-depth={reply.depth} data-id={reply.id} id={`comment_${reply.id}`} style={liStyle}>
            <div className='author'>
                {reply.author}
            </div>
            { reply.is_deleted ? 
                <div className='contents'>
                    <span>삭제된 댓글입니다.</span>
                </div> :
                <div className='contents' onClick={loadReplyForm}>
                    {XSS.recover(reply.contents)}
                </div>
            }
            { isDeleteMode && 
                <div className='delete-box'>
                    <span>정말로 삭제하시겠습니까?</span>
                    <button type='button' onClick={onDelete}>O</button>
                    <button type='button' onClick={offDeleteMode}>X</button>
                </div>
            }
            <div className='foot'>
                <span>{reply.created_at}</span>
                <button type='button' className={btnClass} data-id={reply.id} onClick={onModifyMode}>수정</button>
                <button type='button' className={btnClass} onClick={onDeleteMode}>삭제</button>
            </div>
        </li>
    );
};

export default Reply;