import React from 'react';
import BoardRow from './BoardRow';
import qs from 'query-string';

const ArticleList = ({
    posts
}) => {
    const query = qs.parse(location.search);

    return (
        <ul className='board'>
            { (posts.length == 0 && query.type && query.keyword) ?
                <div id='search-fail'>
                    <span>No results found for <span id='keyword'>"{query.keyword}"</span></span>
                </div> : 
                posts.map((cur, i) => <BoardRow post={cur} key={i}/>)
            }
        </ul>
    )
};

export default ArticleList;