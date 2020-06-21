import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReplyContainer from '~c/containers/ReplyContainer';

const Article = ({
    article, auth, id, onDelete, goBack, deletePost, history
}) => {   
    let btnClass;
    if (auth) btnClass = 'personal-btn show';
    else btnClass = 'personal-btn'

    return (   
        <section>
            { !onDelete ?
                <Fragment>
                    <article>
                        <div className='head'>
                            <h3>{article.title}</h3>
                            <div className='details'>
                                <span className='author'>{article.author}</span>
                                <span>|</span>
                                <span className='read'>views {article.read_count}</span>
                                <span>|</span>
                                <span className='time'>{article.created_at}</span>
                            </div>
                        </div>
                        <div className='body' dangerouslySetInnerHTML={ {__html: article.contents} }></div>
                        <div className='foot'>
                            <span>replies {article.reply_count}</span>
                            <div className='btns'>
                                <Link to={`/modify/${id}`} className='link'>
                                    <button type='button' className={btnClass}>Modify</button>
                                </Link>
                                <Link to={`/delete/${id}`} className='link'>
                                    <button type='button' className={btnClass}>Delete</button>
                                </Link>
                            </div>
                        </div>
                    </article> 
                    <ReplyContainer history={history}/>
                </Fragment> :
                <article>
                    <div className='head'>
                        <h3>{article.title}</h3>
                        <div className='details'>
                            <span className='author'>{article.author}</span>
                            <span>|</span>
                            <span className='read'>views {article.read_count}</span>
                            <span>|</span>
                            <span className='time'>{article.created_at}</span>
                        </div>
                    </div>
                    <div className='body'>
                        <span>Are you really sure to delete this post?</span>
                    </div>
                    <button type='button' onClick={deletePost}>Delete</button>
                    <button type='button' onClick={goBack}>Cancel</button>
                </article>
            }
        </section>
    );
};

export default Article;