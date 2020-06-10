import React, { Fragment } from 'react';
import { ArticleList } from './index';
import PaginationContainer from '~c/containers/PaginationContainer';

const BoardBody = ({
    onReady, posts
}) => {
    return (
        <Fragment>
            <div className='section'>
                { onReady && <ArticleList posts={posts}/> }
            </div>
            <PaginationContainer/>
        </Fragment>
    );
};

export default BoardBody;