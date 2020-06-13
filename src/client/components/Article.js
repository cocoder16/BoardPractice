import React from 'react';
import { Link } from 'react-router-dom';
import ReplyContainer from '~c/containers/ReplyContainer';

const Article = ({
    onReady, article, auth, id, onDelete, goBack, deletePost
}) => {   
    let btnClass;
    if (auth) btnClass = 'personal-btn show';
    else btnClass = 'personal-btn'

    return (   
        <section>
            { (onReady && !onDelete) && 
                <article>
                    <div className='head'>
                        <h3>{article.title}</h3>
                        <div className='details'>
                            <span className='read'>views {article.read_count}</span>
                            <span className='time'>{article.created_at}</span>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={ {__html: article.contents} }>
                    </div>
                    <div className='foot'>
                        <span>replies {article.reply_count}</span>
                        <div className='btns'>
                            <Link to={`/modify/${id}`} className='link'><button type='button' className={btnClass}>Modify</button></Link>
                            <Link to={`/delete/${id}`} className='link'><button type='button' className={btnClass}>Delete</button></Link>
                        </div>
                    </div>
                </article>
            }
            { onDelete &&
                <article>
                    <div>
                        <span>Are you really sure to delete this post?</span>
                    </div>
                    <button type='button' onClick={deletePost}>Delete</button><button type='button' onClick={goBack}>Cancel</button>
                </article>
            }
            <ReplyContainer/>
        </section>
    );
};

export default Article;