import React from 'react';
import BoardRow from './BoardRow';
import qs from 'query-string';

const ArticleList = ({
    posts
}) => {
    console.log("ArticleList");
    console.log(posts);
    const query = qs.parse(location.search);

    return (
        <ul className='board'>
            { (posts.length == 0 && query.type && query.keyword) ?
                <div>
                    <span>"{query.keyword}" 검색결과가 없습니다.</span>
                </div> : 
                posts.map((cur, i) => <BoardRow post={cur} key={i}/>)
            }
        </ul>
    )
};

export default ArticleList;