import React from 'react';
import { Link } from 'react-router-dom';

const InfoHead = () => {
    return (
        <div>
            <ul>
                <Link to='/info/privacy'><li>개인 정보 관리</li></Link>
                <Link to='/info/posts'><li>내가 쓴 글</li></Link>
                <Link to='/info/replys'><li>내가 쓴 댓글</li></Link>
            </ul>
        </div>
    )
};

export default InfoHead;