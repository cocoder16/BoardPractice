import React from 'react';
import { Link } from 'react-router-dom';

const BoardHead = ({
    category, isLoggedIn
}) => {
    let writeBtn = null;
    if (isLoggedIn) {
        writeBtn = <Link to='/write'><button>글쓰기</button></Link>
    }
    return (
        <div>
            <h1>{category}</h1>
            {/* 글쓰기버튼, 검색 => 한줄에 오른쪽에 몰아서 */}
            {writeBtn}
            <form>
                <input type='text' name='keyword'/>
                <input type='submit' value='검색'/>
            </form>
        </div>
    )
};

export default BoardHead;