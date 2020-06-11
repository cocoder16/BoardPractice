import React from 'react';
import { PageItem } from './index';
import qs from 'query-string';

const Pagination = ({
    category, //string으로
    now, max, interval, //여기로 넘겨지는 값들은 1부터 세는 값들
}) => {
    let pageData;
    now = now*1;
    max = max*1;
    interval = interval*1;

    const query = qs.parse(location.search);
    console.log('Pagination');
    console.log(query);
    const pathname = location.pathname;
    let type = 0; //type 0 : board, 1 : search, 2 : info/posts, 3: info/replies
    if (query.type && query.keyword) type = 1;
    console.log(pathname);
    if (pathname == '/info/posts') type = 2;
    else if (pathname == '/info/replies') type = 3;

    const reviseStartVal = () => {
        if (now % interval == 0) return now - interval + 1;
        return now - now % interval + 1;
    }

    const lastPageCount = () => {
        if (max % interval == 0) return interval;
        return max % interval;
    }

    const liGenerator = (first, last, len=interval, start=reviseStartVal(), _type=type) => {
        const data = [];
        console.log(category);
        console.log(_type);
        if (_type == 1) {
            console.log('onSearch');
            const type = query.type;
            const keyword = query.keyword;
            if (!first) {
                data.push({ url: `/${category}?type=${type}&keyword=${keyword}`, val: '<<'});
                data.push({ url: `/${category}?type=${type}&keyword=${keyword}&page=${start-1}`, val: '<'});
            }
            for (let i = 0; i < len; i++) {
                data.push({ url: `/${category}?type=${type}&keyword=${keyword}&page=${start+i}`, val: `${start+i}`});
            }
            if (!last) {
                data.push({ url: `/${category}?type=${type}&keyword=${keyword}&page=${start+interval}`, val: '>'});
                data.push({ url: `/${category}?type=${type}&keyword=${keyword}&page=${max}`, val: '>>'});
            }
            console.log(data);
        } else if (_type == 0) {
            if (!first) {
                data.push({ url: `/${category}`, val: '<<'});
                data.push({ url: `/${category}?page=${start-1}`, val: '<'});
            }
            for (let i = 0; i < len; i++) {
                data.push({ url: `/${category}?page=${start+i}`, val: `${start+i}`});
            }
            if (!last) {
                data.push({ url: `/${category}?page=${start+interval}`, val: '>'});
                data.push({ url: `/${category}?page=${max}`, val: '>>'});
            }
        } else if (_type == 2) {
            if (!first) {
                data.push({ url: `/info/posts`, val: '<<'});
                data.push({ url: `/info/posts?page=${start-1}`, val: '<'});
            }
            for (let i = 0; i < len; i++) {
                data.push({ url: `/info/posts?page=${start+i}`, val: `${start+i}`});
            }
            if (!last) {
                data.push({ url: `/info/posts?page=${start+interval}`, val: '>'});
                data.push({ url: `/info/posts?page=${max}`, val: '>>'});
            }
        } else if (_type == 3) {
            if (!first) {
                data.push({ url: `/info/replies`, val: '<<'});
                data.push({ url: `/info/replies?page=${start-1}`, val: '<'});
            }
            for (let i = 0; i < len; i++) {
                data.push({ url: `/info/replies?page=${start+i}`, val: `${start+i}`});
            }
            if (!last) {
                data.push({ url: `/info/replies?page=${start+interval}`, val: '>'});
                data.push({ url: `/info/replies?page=${max}`, val: '>>'});
            }
        }
        return data;
    }

    const classNameGenerator = (val) => {
        switch (val) {
            case '<<' :
                return 'paging-item first'
            case '<' :
                return 'paging-item prev'
            case '>' :
                return 'paging-item next'
            case '>>' :
                return 'paging-item last'
            default :
                return 'paging-item'
        }
    }
    
    if (max <= interval) { // 페이지가 단 하나
        pageData = liGenerator(true, true, max);
    } else if (max - (now - 1) <= lastPageCount()) { // 마지막 페이지set이란 뜻
        if (max % interval == 0) pageData = liGenerator(false, true, interval);
        else pageData = liGenerator(false, true, max % interval);
    } else if (now <= interval) { // 첫번째 페이지set이란 뜻
        pageData = liGenerator(true, false);
    } else {
        pageData = liGenerator(false, false);
    }

    return (
        <div className='pagination'>
            <ul>
                {pageData.map((cur, i) => {
                    return (<PageItem 
                        to={cur.url} 
                        classname={
                            cur.val == now ? 'paging-item now' : classNameGenerator(cur.val)
                        }
                        val={cur.val}
                        key={i}
                    />);
                })}
            </ul>
        </div>
    )
};

export default Pagination;