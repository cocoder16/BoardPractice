import * as servicePosts from '~c/services/posts';

//action type
const SET_CATEGORY = 'board/SET_CATEGORY';
const GET_POSTS = 'board/GET_POSTS';
const GET_ARTICLE = 'board/GET_ARTICLE';
const ARTICLE_PENDING = 'board/ARTICLE_PENDING';
const GET_DELETE_ALERT = 'board/GET_DELETE_ALERT';
const SKIM_ON_DELETE = 'board/SKIM_ON_DELETE';

//function creating action
export const getPosts = (category, queryString) => async (dispatch, getState) => {
    console.log(queryString);
    dispatch({
        type: SET_CATEGORY,
        payload: category
    });
    let page;
    if (!queryString) page = '1';
    else page = queryString.split('=')[1];
    const result = await servicePosts.getPosts(category, page, getState().board.per);
    console.log('getPosts');
    if (result.result) {
        dispatch({
            type: GET_POSTS,
            payload: { result, page }
        });
    } else {
        window.location.replace(result.url);
    }
}
export const getArticle = (num) => async (dispatch, getState) => {
    dispatch({type: ARTICLE_PENDING});
    const article = await servicePosts.getArticle(num);
    if (article.result) {
        dispatch({
            type: GET_ARTICLE,
            payload: { article: article.article }
        });
    } else {
        window.location.replace(article.url);
    }
}
export const getDeleteAlert = () => ({type: GET_DELETE_ALERT});
export const skimOnDelete = () => ({type: SKIM_ON_DELETE});
export const deletePost = (id) => async (dispatch, getState) => {
    servicePosts.deletePost(id, getState().board.category);
    dispatch({type: SKIM_ON_DELETE});
}

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
    interval: 3
}

//reducer
export default function reducer (state=initialState, action) {
    switch (action.type) {
        case SET_CATEGORY :
            return { ...state, category: action.payload, listOnReady: false };
        case GET_POSTS :
            return { ...state, posts: [ ...action.payload.result.posts ], now: action.payload.page,
                max: action.payload.result.max, listOnReady: true };
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
        default :
            return state;
    }
}