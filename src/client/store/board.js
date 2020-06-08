import * as servicePosts from '~c/services/posts';
import * as serviceUsers from '~c/services/users';
import session from 'express-session';

//action type
const SET_CATEGORY = 'board/SET_CATEGORY';
const GET_POSTS = 'board/GET_POSTS';
const GET_ARTICLE = 'board/GET_ARTICLE';
const ARTICLE_PENDING = 'board/ARTICLE_PENDING';
const GET_DELETE_ALERT = 'board/GET_DELETE_ALERT';
const SKIM_ON_DELETE = 'board/SKIM_ON_DELETE';
const REPLY_COUNT_UP = 'board/REPLY_COUNT_UP';
const SET_SEARCH_TYPE = 'board/SET_SEARCH_TYPE';
const SET_SEARCH_KEYWORD = 'board/SET_SEARCH_KEYWORD';
const GET_SEARCH = 'board/GET_SEARCH';
const GET_USER_WROTE = 'board/GET_USER_WROTE';
const DELETE_USER_WROTE = 'board/DELTE_USER_WROTE';

//function creating action
export const getPosts = (category, query) => async (dispatch, getState) => {
    dispatch({
        type: SET_CATEGORY,
        payload: category
    });
    let page;
    if (!query.page) page = '1';
    else page = query.page;
    const result = await servicePosts.getPosts(category, page, getState().board.per);
    console.log('getPosts');
    console.log(result);
    if (result.result) {
        dispatch({
            type: GET_POSTS,
            payload: { posts: result.posts, page, max: result.max }
        });
        dispatch({
            type: GET_SEARCH,
            payload: { type: 0, keyword: '' }
        });
        document.querySelector('.input-search-type').value = 0;
        document.querySelector('.input-search-keyword').value = '';
    } else {
        window.location.replace(result.url);
    }
};
export const search = (category, query) => async (dispatch, getState) => {
    console.log('search');
    console.log(category);
    console.log(query);
    dispatch({
        type: SET_CATEGORY,
        payload: category
    });
    let page;
    if (!query.page) page = '1';
    else page = query.page;
    const result = await servicePosts.search(category, query.type, query.keyword, page, getState().board.per);
    if (result.result) {
        dispatch({
            type: GET_POSTS,
            payload: { posts: result.posts, page, max: result.max }
        });
        dispatch({
            type: GET_SEARCH,
            payload: { type: query.type, keyword: query.keyword }
        });
        document.querySelector('.input-search-type').value = query.type;
        document.querySelector('.input-search-keyword').value = query.keyword;
    } else {
        window.location.replace(result.url);
    }
};
export const getArticle = (num) => async (dispatch, getState) => {
    dispatch({type: ARTICLE_PENDING});
    let newGet = 0;
    console.log(num);
    console.log(sessionStorage.getItem('article-id'));
    if (sessionStorage.getItem('article-id') != num) newGet = 1;
    sessionStorage.setItem('article-id', num);
    const article = await servicePosts.getArticle(num, newGet);
    if (article.result) {
        dispatch({
            type: GET_ARTICLE,
            payload: { article: article.article }
        });
    } else {
        window.location.replace(article.url);
    }
};
export const getDeleteAlert = () => ({type: GET_DELETE_ALERT});
export const skimOnDelete = () => ({type: SKIM_ON_DELETE});
export const deletePost = (id) => async (dispatch, getState) => {
    servicePosts.deletePost(id, getState().board.category);
    dispatch({type: SKIM_ON_DELETE});
};
export const replyCountUp = () => ({type: REPLY_COUNT_UP});
export const setSearchType = (val) => ({
    type: SET_SEARCH_TYPE,
    payload: val
});
export const setSearchKeyword = (val) => ({
    type: SET_SEARCH_KEYWORD,
    payload: val
});
export const getUserWrote = (type, query) => async (dispatch, getState) => {
    let page;
    if (!query.page) page = '1';
    else page = query.page;
    const data = await serviceUsers.getUserWrote(type, page, getState().board.per);
    console.log('getUserWrote');
    console.log(data);
    if (data.result) {
        dispatch({
            type: GET_USER_WROTE,
            payload: { data, page }
        });
    } else {
        window.location.replace(data.url);
    }
};
export const deleteUserWrote = () => ({type: DELETE_USER_WROTE});

//module's initial state
const initialState = {
    category: '',
    posts: [],
    listOnReady: false,
    article: {},
    articleOnReady: false,
    onDelete: false,
    per: 2,
    now: 1,
    max: 1,
    interval: 3,
    searchType: 0,
    searchKeyword: '',
    userPosts: [],
    userReplies: []
}

//reducer
export default function reducer (state=initialState, action) {
    switch (action.type) {
        case SET_CATEGORY :
            return { ...state, category: action.payload, listOnReady: false };
        case GET_POSTS :
            return { ...state, posts: [ ...action.payload.posts ], now: action.payload.page,
                max: action.payload.max, listOnReady: true };
        case GET_ARTICLE : 
            const _article = { ...action.payload.article };
            delete _article.category;
            let cate;
            if (action.payload.article.category == 0) cate = 'qna';
            else if (action.payload.article.category == 1) cate = 'forum';
            return { ...state, category: cate, article: _article, articleOnReady: true };
        case ARTICLE_PENDING :
            return { ...state, articleOnReady: false };
        case GET_DELETE_ALERT :
            return { ...state, onDelete: true };
        case SKIM_ON_DELETE :
            return { ...state, onDelete: false };
        case REPLY_COUNT_UP :
            return { ...state, article: { ...state.article, reply_count: ++state.article.reply_count } };
        case SET_SEARCH_TYPE : 
            return { ...state, searchType: action.payload };
        case SET_SEARCH_KEYWORD :
            return { ...state, searchKeyword: action.payload };
        case GET_SEARCH :
            return { ...state, searchType: action.payload.type, searchKeyword: action.payload.keyword };
        case GET_USER_WROTE :
            console.log('SET_USER_WROTE');
            console.log(action.payload);
            return { ...state, userPosts: action.payload.data.postArr, userReplies: action.payload.data.replyArr,
                now: action.payload.page, max: action.payload.data.max }
        case DELETE_USER_WROTE :
            return { ...state, userPosts: [], userReplies: [] }
        default :
            return state;
    }
}