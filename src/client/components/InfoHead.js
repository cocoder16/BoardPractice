import React from 'react';
import { Link } from 'react-router-dom';

const InfoHead = () => {
    return (
        <div className='info-head'>
            <ul>
                <li><Link to='/info/privacy' className='link'>Management</Link></li>
                <li className='line'>l</li>
                <li><Link to='/info/posts' className='link'>My articles</Link></li>
                <li className='line'>l</li>
                <li><Link to='/info/replies' className='link'>My replies</Link></li>
            </ul>
        </div>
    )
};

export default InfoHead;