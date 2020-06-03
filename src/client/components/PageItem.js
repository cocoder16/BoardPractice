import React from 'react';
import { Link } from 'react-router-dom';

const PageItem = ({
    to, className, val
}) => {
    return (
        <li><Link to={to} className={className}>{val}</Link></li>
    )
};

export default PageItem;