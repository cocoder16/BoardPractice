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
    const pathname = location.pathname;
    let type = 0; //type 0 : board, 1 : search, 2 : info/posts, 3: info/replies
    if (query.type && query.keyword) type = 1;
    if (pathname == '/info/posts') type = 2;
    else if (pathname == '/info/replies') type = 3;

    const setStartVal = () => {
        if (now % interval == 0) return now - interval + 1;
        return now - now % interval + 1;
    };

    const getLastPageCount = () => {
        if (max % interval == 0) return interval;
        return max % interval;
    };

    const dataArrGenerator = ({ first, last, len, start, url }) => {
        const data = [];
        let separator;
        if (url.indexOf('?') != -1) separator = '&';
        else separator = '?';
        
        if (!first) {
            data.push({ url, val: '<<'});
            data.push({ url: `${url}${separator}page=${start-1}`, val: '<'});
        }
        for (let i = 0; i < len; i++) {
            data.push({ url: `${url}${separator}page=${start+i}`, val: `${start+i}`});
        }
        if (!last) {
            data.push({ url: `${url}${separator}page=${start+interval}`, val: '>'});
            data.push({ url: `${url}${separator}page=${max}`, val: '>>'});
        }
        return data;
    }

    const liGenerator = (first, last, len=interval) => {
        let data;
        if (type == 0) {
            data = dataArrGenerator({ first, last, len, start: setStartVal(), url: `/${category}` });
        } else if (type == 1) {
            const type = query.type;
            const keyword = query.keyword;
            data = dataArrGenerator({ first, last, len, start: setStartVal(), url: `/${category}?type=${type}&keyword=${keyword}` });
        } else if (type == 2) {
            data = dataArrGenerator({ first, last, len, start: setStartVal(), url: `/info/posts` });
        } else if (type == 3) {
            data = dataArrGenerator({ first, last, len, start: setStartVal(), url: `/info/replies` });
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
    } else if (max - (now - 1) <= getLastPageCount()) { // 마지막 페이지set이란 뜻
        if (max % interval == 0) pageData = liGenerator(false, true, interval);
        else pageData = liGenerator(false, true, max % interval);
    } else if (now <= interval) { // 첫번째 페이지set이란 뜻
        pageData = liGenerator(true, false);
    } else {
        pageData = liGenerator(false, false);
    }

    return (
        <nav className='pagination'>
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
        </nav>
    )
};

export default Pagination;