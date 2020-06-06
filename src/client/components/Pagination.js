import React from 'react';
import { PageItem } from './index';
import qs from 'query-string';

const Pagination = ({
    category, //string으로
    now, max, interval, //여기로 넘겨지는 값들은 1부터 세는 값들
    type, keyword
}) => {
    let pageData;
    now = now*1;
    max = max*1;
    interval = interval*1;

    const query = qs.parse(location.search);
    console.log('Pagination');
    console.log(query);
    let onSearch = false;
    if (query.type && query.keyword) onSearch = true;
    console.log(onSearch);

    const reviseStartVal = () => {
        if (now % interval == 0) return now - interval + 1;
        return now - now % interval + 1;
    }

    const lastPageCount = () => {
        if (max % interval == 0) return interval;
        return max % interval;
    }

    const liGenerator = (first, last, len=interval, start=reviseStartVal(), search=onSearch) => {
        const data = [];
        console.log(category);
        console.log(search);
        if (search) {
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
        } else {
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
        }
        return data;
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
        <ul className='pagination'>
            {pageData.map((cur, i) => {
                return (<PageItem 
                    to={cur.url} 
                    className={
                        cur.val == now ? 'link now' : 'link'
                    }
                    val={cur.val}
                    key={i}
                />);
            })}
        </ul>
    )
};

export default Pagination;