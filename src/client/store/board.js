import * as servicePosts from '~c/services/posts';
import * as serviceUsers from '~c/services/users';

//action type
const SET_CATEGORY = 'board/SET_CATEGORY';
const GET_POSTS = 'board/GET_POSTS';
const GET_ARTICLE = 'board/GET_ARTICLE';
const GET_DELETE_ALERT = 'board/GET_DELETE_ALERT';
const SKIM_ON_DELETE = 'board/SKIM_ON_DELETE';
const REPLY_COUNT_UP = 'board/REPLY_COUNT_UP';
const REPLY_COUNT_DOWN = 'board/REPLY_COUNT_DOWN';

const SET_SEARCH_TYPE = 'board/SET_SEARCH_TYPE';
const SET_SEARCH_KEYWORD = 'board/SET_SEARCH_KEYWORD';
const GET_SEARCH = 'board/GET_SEARCH';
const GET_USER_WROTE = 'board/GET_USER_WROTE';
const DELETE_USER_WROTE = 'board/DELTE_USER_WROTE';
const RECENT_POSTS = 'board/RECENT_POSTS';
const ON_PENDING = 'board/ON_PENDING';
const OFF_PENDING = 'board/OFF_PENDING';
const CLEAR_ARTICLE = 'board/CLEAR_ARTICLE';

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
    dispatch({
        type: GET_POSTS,
        payload: { posts: result.posts, page, max: result.max }
    });
    dispatch({
        type: GET_SEARCH,
        payload: { type: 0, keyword: '' }
    });
    document.querySelector('.input-search.type').value = 0;
    document.querySelector('.input-search.keyword').value = '';
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
    console.log(query.type);
    const result = await servicePosts.search(category, query.type, query.keyword, page, getState().board.per);
    dispatch({
        type: GET_POSTS,
        payload: { posts: result.posts, page, max: result.max }
    });
    dispatch({
        type: GET_SEARCH,
        payload: { type: query.type, keyword: query.keyword }
    });
    console.log('xxx');
    console.log(query.type);
    document.querySelector('.input-search.type').value = query.type;
    document.querySelector('.input-search.keyword').value = query.keyword;
};
export const getArticle = (id) => async (dispatch, getState) => {
    let newGet = 0;
    console.log(id);
    console.log(sessionStorage.getItem('article-id'));
    if (sessionStorage.getItem('article-id') != id) newGet = 1;
    sessionStorage.setItem('article-id', id);
    const article = await servicePosts.getArticle(id, newGet);
    dispatch({
        type: GET_ARTICLE,
        payload: { article: article.article }
    });
};
export const getDeleteAlert = () => ({type: GET_DELETE_ALERT});
export const skimOnDelete = () => ({type: SKIM_ON_DELETE});
export const deletePost = (id) => async (dispatch, getState) => {
    await servicePosts.deletePost(id, getState().board.category);
    dispatch({type: SKIM_ON_DELETE});
};
export const replyCountUp = () => ({type: REPLY_COUNT_UP});
export const replyCountDown = () => ({type: REPLY_COUNT_DOWN});

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
    dispatch({
        type: GET_USER_WROTE,
        payload: { data, page }
    })
};
export const deleteUserWrote = () => ({type: DELETE_USER_WROTE});
export const getRecentPosts = () => async (dispatch, getState) => {
    const posts = await servicePosts.recentPosts();
    console.log('recent posts');
    console.log(posts);
    dispatch({
        type: RECENT_POSTS,
        payload: posts
    })
}
export const pending = () => ({type: ON_PENDING});
export const pendingOff = () => ({type: OFF_PENDING});
export const clearArticle = () => ({type: CLEAR_ARTICLE});

//module's initial state
const initialState = {
    category: '',
    posts: [],
    onPending: false,
    article: {},
    onDelete: false,
    per: 20,
    now: 1,
    max: 1,
    interval: 10,
    searchType: 0,
    searchKeyword: '',
    userPosts: [],
    userReplies: [],
    recentPosts: { qna: [], forum: [] },
}

//reducer
export default function reducer (state=initialState, action) {
    switch (action.type) {
        case SET_CATEGORY :
            return { ...state, category: action.payload };
        case GET_POSTS :
            return { ...state, posts: [ ...action.payload.posts ], now: action.payload.page,
                max: action.payload.max, onPending: false };
        case GET_ARTICLE : 
            const _article = { ...action.payload.article };
            delete _article.category;
            let cate;
            if (action.payload.article.category == 0) cate = 'qna';
            else if (action.payload.article.category == 1) cate = 'forum';
            return { ...state, category: cate, article: _article, onPending: false };
        case GET_DELETE_ALERT :
            return { ...state, onDelete: true };
        case SKIM_ON_DELETE :
            return { ...state, onDelete: false };
        case REPLY_COUNT_UP :
            return { ...state, article: { ...state.article, reply_count: ++state.article.reply_count }};
        case REPLY_COUNT_DOWN :
            return { ...state, article: { ...state.article, reply_count: --state.article.reply_count }};
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
        case RECENT_POSTS :
            return { ...state, recentPosts: { qna: [ ...action.payload.qnaArr ], forum: [ ...action.payload.forumArr ] },
                onPending: false }
        case ON_PENDING :
            return { ...state, onPending: true }
        case OFF_PENDING :
            return { ...state, onPending: false }
        case CLEAR_ARTICLE :
            return { ...state, article: {}}
        default :
            return state;
    }
}