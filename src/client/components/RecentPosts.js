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
            { onReady && 
                <Fragment>
                    <section>
                        <h2><Link to='/qna' className='link'>Q n A</Link></h2>
                        <ArticleList posts={posts.qna}/>
                    </section>
                    <section>
                        <h2><Link to='/forum' className='link'>Forum</Link></h2>
                        <ArticleList posts={posts.forum}/>
                    </section>
                </Fragment>
            }
        </Fragment>
    );
};

export default RecentPosts;