import React, { Fragment } from 'react';
import { ArticleList } from '~c/components/index';
import PaginationContainer from '~c/containers/PaginationContainer';

const BoardBody = ({
    onReady, posts
}) => {
    return (
        <Fragment>
            { onReady && <ArticleList posts={posts}/> }
            <PaginationContainer/>
        </Fragment>
    );
};

export default BoardBody;