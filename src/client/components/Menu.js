import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {

    return (
        <ul className='menu'>
            <li>
                <Link to='/qna' className='link'>
                    <div className='item-box'>
                        <img src='/images/QnaIcon.png' alt='Q n A'/>
                        <span>Q n A</span>
                    </div>
                </Link>
            </li>
            <li>
                <Link to='/forum' className='link'>
                    <div className='item-box'>
                        <img src='/images/ForumIcon.png' alt='Forum'/>
                        <span>Forum</span>
                    </div>
                </Link>
            </li>
        </ul>
    )
};

export default Menu;