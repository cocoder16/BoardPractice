import React from 'react';
import { InfoRow } from './index';
import PaginationContainer from '~c/containers/PaginationContainer';

const InfoList = ({
    posts, replies
    //'id title category read_count reply_count created_at'
    //'id contents created_at post_id'
}) => {
    let mode;
    if (location.pathname == '/info/posts') mode = 'post';
    else if (location.pathname == '/info/replies') mode = 'reply';
    
    return (
        <section>
            <ul className='info-board'>
                { mode == 'post' &&
                    posts.map((cur, i) => <InfoRow post={cur} key={i}/>)
                }
                { mode == 'reply' &&
                    replies.map((cur, i) => <InfoRow reply={cur} key={i}/>)
                }
            </ul>
            <PaginationContainer/>
        </section>
    )
};

export default InfoList;