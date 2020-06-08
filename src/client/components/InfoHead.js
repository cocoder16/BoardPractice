import React from 'react';
import { Link } from 'react-router-dom';

const InfoHead = () => {
    return (
        <div>
            <ul>
                <li><Link to='/info/privacy' className='link'>개인 정보 관리</Link></li>
                <li><Link to='/info/posts' className='link'>내가 쓴 글</Link></li>
                <li><Link to='/info/replies' className='link'>내가 쓴 댓글</Link></li>
            </ul>
        </div>
    )
};

export default InfoHead;