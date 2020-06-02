import React, {  Fragment } from 'react';

const Article = ({
    onReady, article
}) => {   
    return (
        <Fragment>
            { onReady && 
            <div>
                <div>
                    <h3>{article.title}</h3>
                    <span>{article.read_count}</span>
                    <span>{article.created_at}</span>
                </div>
                <div dangerouslySetInnerHTML={ {__html: article.contents} }>
                </div>
                <div>
                    {article.reply_count}
                </div>
            </div> }
        </Fragment>
    );
};

export default Article;