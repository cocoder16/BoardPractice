import React, { Fragment } from 'react';
import { ArticleList } from './index';

const RecentPosts = ({
    posts, onReady
}) => {
    console.log('RecentPosts');
    console.log(posts);
    return (
        <Fragment>
            <div>
                <h2>Q n A</h2>
                { onReady && <ArticleList posts={posts.qna}/> }
            </div>
            <div>
                <h2>Forum</h2>
                { onReady && <ArticleList posts={posts.forum}/> }
            </div>
        </Fragment>
    );
};

export default RecentPosts;