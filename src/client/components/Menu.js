import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <ul className='menu'>
            <li><Link to='/qna' className='link'>Q n A</Link></li>
            <li><Link to='/forum' className='link'>Forum</Link></li>
        </ul>
    )
};

export default Menu;