import React, {  Fragment } from 'react';
import { Link } from 'react-router-dom';

const Article = ({
    onReady, article, auth, id
}) => {   
    let btnClass;
    if (auth) btnClass = 'modify-btn show';
    else btnClass = 'modify-btn'

    return (
        <Fragment>
            { onReady && 
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
                    <Link to={`/modify/${id}`}><button className={btnClass}>수정</button></Link>
                </div>
                <div>
                    replys
                </div>
            </div> }
        </Fragment>
    );
};

export default Article;