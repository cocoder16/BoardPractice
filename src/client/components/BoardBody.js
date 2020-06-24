import React, { Fragment } from 'react';
import { ArticleList } from './index';
import PaginationContainer from '~c/containers/PaginationContainer';

const BoardBody = ({
    posts
}) => {
    return (
        <Fragment>
            <section>
                <ArticleList posts={posts}/>
            </section>
            <PaginationContainer/>
        </Fragment>
    );
};

export default BoardBody;