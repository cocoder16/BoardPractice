import React from 'react';
import { Link } from 'react-router-dom';

const PageItem = ({
    to, classname, val
}) => {
    return (
        <li className={classname}>
            <Link to={to} className='link' onClick={() => window.scrollTo(0, 0)}>{val}</Link>
        </li>
    )
};

export default PageItem;