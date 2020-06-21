import React from 'react';
import { Link } from 'react-router-dom';

const BoardHead = ({
    category, isLoggedIn, isModify, searchType,
    onChangeSearchType, onChangeSearchKeyword, onSearch
}) => {
    const path = location.pathname;
    let isWrite = false;
    if (path == '/write') isWrite = true;

    let cate;
    if (category == 'qna') cate = 'Q n A';
    else if (category == 'forum') cate = 'Forum';

    return (
        <div className='board-head'>
            <h2>
                <Link to={`/${category}`} className='link'>{cate}</Link>
            </h2>
            { (isLoggedIn && !isWrite && !isModify) && 
                <Link to='/write' className='link'>
                    <button type='button'>Write</button>
                </Link> 
            }
            <form onSubmit={onSearch}>
                <div className='left wrap'>
                    <select name="type" className='input-search type' defaultValue={searchType} onChange={onChangeSearchType}>
                        <option value="0">title</option>
                        <option value="1">title + text</option>
                        <option value="2">author</option>
                    </select>
                </div>
                <div className='right wrap'>
                    <input type='text' name='keyword' className='input-search keyword' maxLength='50'
                        onChange={onChangeSearchKeyword}
                    />
                    <button type='submit'>
                        <img src='/images/SearchBtn.png'/>
                    </button>
                </div>
            </form>
        </div>
    )
};

export default BoardHead;