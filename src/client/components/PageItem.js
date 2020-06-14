import React from 'react';
import { Link } from 'react-router-dom';

const PageItem = ({
    to, classname, val
}) => {
    return (
        <li className={classname}>
            <Link to={to} className='link'>{val}</Link>
        </li>
    )
};

export default PageItem;