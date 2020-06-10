import React, { Fragment } from 'react';
import { ArticleList } from './index';
import { Link } from 'react-router-dom';

const RecentPosts = ({
    posts, onReady
}) => {
    console.log('RecentPosts');
    console.log(posts);
    return (
        <Fragment>
            <div className='section'>
                <Link to='/qna' className='link'><h2>Q n A</h2></Link>
                { onReady && <ArticleList posts={posts.qna}/> }
            </div>
            <div className='section'>
                <Link to='/forum' className='link'><h2>Forum</h2></Link>
                { onReady && <ArticleList posts={posts.forum}/> }
            </div>
        </Fragment>
    );
};

export default RecentPosts;