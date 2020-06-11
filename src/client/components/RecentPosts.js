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
                <h2><Link to='/qna' className='link'>Q n A</Link></h2>
                { onReady && <ArticleList posts={posts.qna}/> }
            </div>
            <div className='section'>
                <h2><Link to='/forum' className='link'>Forum</Link></h2>
                { onReady && <ArticleList posts={posts.forum}/> }
            </div>
        </Fragment>
    );
};

export default RecentPosts;