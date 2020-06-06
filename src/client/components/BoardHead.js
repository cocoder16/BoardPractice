import React from 'react';
import { Link } from 'react-router-dom';

const BoardHead = ({
    category, isLoggedIn, isModify, searchType, searchKeyword, onChangeSearchType, onChangeSearchKeyword
}) => {
    const path = location.pathname;
    let isWrite = false;
    if (path == '/write') isWrite = true;

    return (
        <div className='board-head'>
            <h1>{category}</h1>
            {/* 글쓰기버튼, 검색 => 한줄에 오른쪽에 몰아서 */}
            { (isLoggedIn && !isWrite && !isModify ) && <Link to='/write'><button type='button'>글쓰기</button></Link> }
            <form action={`/${category}?type=${searchType}&keyword=${searchKeyword}`}>
                <select name="type" className='input-search-type' defaultValue={searchType} onChange={onChangeSearchType}>
                    <option value="0">제목</option>
                    <option value="1">제목+본문</option>
                    <option value="2">글쓴이</option>
                </select>
                <input type='text' name='keyword' className='input-search-keyword' 
                    onChange={onChangeSearchKeyword}
                />
                <input type='submit' value='검색'/>
            </form>
        </div>
    )
};

export default BoardHead;