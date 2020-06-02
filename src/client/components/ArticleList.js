import React from 'react';
import BoardRow from './BoardRow';

const ArticleList = ({
    posts
}) => {
    console.log("ArticleList");
    console.log(posts);
    return (
        <ul className='board'>
            {posts.map((cur, i) => <BoardRow post={cur} key={i}/>)}
        </ul>
    )
};

export default ArticleList;