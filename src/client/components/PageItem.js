import React from 'react';
import { Link } from 'react-router-dom';

const PageItem = ({
    to, classname, val
}) => {
    return (
        <Link to={to} className='link' onClick={() => window.scrollTo(0, 0)}>
            <li className={classname}>
                {val}
            </li>
        </Link>
    )
};

export default PageItem;