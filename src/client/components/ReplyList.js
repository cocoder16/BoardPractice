import React, { Fragment } from 'react';
import { Reply, ReplyForm } from './index';

const ReplyList = ({
    replies, loadReplyForm, replyForm, handleTextChange, handleFormSubmit, clear, onModifyMode, unshown
}) => {
    console.log(replies);

    return (
        <ul className='replies'>
            {replies.map((cur, i) => {
                if (unshown == cur.id) return (
                    <ReplyForm 
                        onChange={handleTextChange} 
                        onSubmit={handleFormSubmit}
                        possibleCancel={true}
                        clear={clear}
                        key={i}
                    />
                )
                if (cur.id != replyForm.space) {
                    return (
                        <Reply 
                            reply={cur} 
                            loadReplyForm={loadReplyForm}
                            onModifyMode={onModifyMode}
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