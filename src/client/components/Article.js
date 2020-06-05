import React, {  Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReplyContainer from '~c/containers/ReplyContainer';

const Article = ({
    onReady, article, auth, id, onDelete, goBack, deletePost
}) => {   
    let btnClass;
    if (auth) btnClass = 'personal-btn show';
    else btnClass = 'personal-btn'

    return (
        <Fragment>
            { (onReady && !onDelete) && 
            <div className='article'>
                <div>
                    <h3>{article.title}</h3>
                    <span>{article.read_count}</span>
                    <span>{article.created_at}</span>
                </div>
                <div dangerouslySetInnerHTML={ {__html: article.contents} }>
                </div>
                <div>
                    <span>{article.reply_count}</span>
                    <Link to={`/modify/${id}`} className='link'><button type='button' className={btnClass}>수정</button></Link>
                    <Link to={`/delete/${id}`} className='link'><button type='button' className={btnClass}>삭제</button></Link>
                </div>
                <div>
                    <ReplyContainer/>
                </div>
            </div> }
            { onDelete &&
                <div>
                    <div>
                        <span>정말로 게시글을 삭제하시겠습니까?</span>
                    </div>
                    <button type='button' onClick={deletePost}>삭제</button><button type='button' onClick={goBack}>아니요</button>
                </div>
            }
        </Fragment>
    );
};

export default Article;