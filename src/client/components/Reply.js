import React from 'react';
import XSS from '~/modules/XSS';

const Reply = ({//id contents author author_id depth parent_id is_deleted created_at
    reply, loadReplyForm, onModifyMode, onDeleteMode, isDeleteMode, offDeleteMode, onDelete
}) => {
    let btnClass, marginLeft;
    
    // 권한
    if (reply.auth && !reply.is_deleted) btnClass = 'personal-btn show';
    else btnClass = 'personal-btn'

    // 들여쓰기
    if (reply.depth >= 5) {
        marginLeft = 50;
    } else {
        marginLeft = reply.depth * 10;
    }

    const wrapStyle = {
        marginLeft
    }

    return (
        <li className='reply' data-depth={reply.depth} data-id={reply.id} id={`comment_${reply.id}`}>
            <div className='reply-wrap' style={wrapStyle}>
                <div className='author'>
                    {reply.author}
                </div>
                { reply.is_deleted ? 
                    <div className='contents'>
                        <span>The reply was deleted.</span>
                    </div> :
                    <div className='contents' onClick={loadReplyForm}>
                        { reply.parent_nickname != null &&
                            <span className='parent-nickname'>{reply.parent_nickname}&nbsp;</span>
                        }
                        <span className='body'>{XSS.recover(reply.contents)}</span>
                    </div>
                }
                { isDeleteMode && 
                    <div className='delete-box'>
                        <span>Are you really sure to delete this reply?</span>
                        <button type='button' data-id={reply.id} onClick={onDelete}>O</button>
                        <button type='button' onClick={offDeleteMode}>X</button>
                    </div>
                }
                <div className='foot'>
                    <div className='right-box'>
                        <span>{reply.created_at}</span>
                        <button type='button' className={btnClass} data-id={reply.id} onClick={onModifyMode}>Modify</button>
                        <button type='button' className={btnClass} data-id={reply.id} onClick={onDeleteMode}>Delete</button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default Reply;