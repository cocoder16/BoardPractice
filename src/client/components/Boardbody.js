import React, { Fragment } from 'react';
import { ArticleList } from '~c/components/index';

const BoardBody = ({
    onReady, posts
}) => {
    return (
        <Fragment>
            { onReady && <ArticleList posts={posts}/> }
        </Fragment>
    );
};

export default BoardBody;