import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav>
            <ul className='menu'>
                <li>
                    <Link to='/qna' className='link' onClick={() => window.scrollTo(0, 0)}>
                        <div className='item-box'>
                            <img src='/images/QnaIcon32.png' alt='Q n A'/>
                            <span>Q n A</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to='/forum' className='link' onClick={() => window.scrollTo(0, 0)}>
                        <div className='item-box'>
                            <img src='/images/ForumIcon32.png' alt='Forum'/>
                            <span>Forum</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    )
};

export default Menu;