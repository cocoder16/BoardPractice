import React, { Fragment } from 'react';
import { ArticleList } from './index';
import PaginationContainer from '~c/containers/PaginationContainer';

const BoardBody = ({
    onReady, posts
}) => {
    return (
        <Fragment>
            <section>
                { onReady && <ArticleList posts={posts}/> }
            </section>
            <PaginationContainer/>
        </Fragment>
    );
};

export default BoardBody;