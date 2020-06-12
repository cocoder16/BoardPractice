import React, { Fragment } from 'react';
import { Reply, ReplyForm } from './index';

const ReplyList = ({
    replies, loadReplyForm, replyForm, handleTextChange, handleFormSubmit, clear, onModifyMode, unshown,
    onDeleteMode, deleteMode, offDeleteMode, onDelete
}) => {
    console.log(replies);

    return (
        <ul className='replies'>
            {replies.length == 0 && 
                <div className='no-replies'>
                    <span>No replies</span>        
                </div>
            }
            {replies.map((cur, i) => {
                if (unshown == cur.id) return (
                    <ReplyForm 
                        onChange={handleTextChange} 
                        onSubmit={handleFormSubmit}
                        possibleCancel={true}
                        clear={clear}
                        value={cur.contents}
                        key={i}
                    />
                )
                if (cur.id != replyForm.space) {
                    return (
                        <Reply 
                            reply={cur} 
                            loadReplyForm={loadReplyForm}
                            onModifyMode={onModifyMode}
                            onDeleteMode={onDeleteMode}
                            isDeleteMode={cur.id == deleteMode}
                            offDeleteMode={offDeleteMode}
                            onDelete={onDelete}
                            key={i}
                        />
                    );
                } else {
                    return (
                        <Fragment key={i}>
                            <Reply 
                                reply={cur} 
                                loadReplyForm={loadReplyForm}
                                onModifyMode={onModifyMode}
                                onDeleteMode={onDeleteMode}
                                isDeleteMode={cur.id == deleteMode}
                                offDeleteMode={offDeleteMode}
                                onDelete={onDelete}
                            />
                            <ReplyForm 
                                onChange={handleTextChange} 
                                onSubmit={handleFormSubmit}
                                possibleCancel={true}
                                clear={clear}
                            />
                        </Fragment>
                    );
                }
            })}
        </ul>
    )
}

export default ReplyList;