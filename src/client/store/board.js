import * as servicePosts from '~c/services/posts';

//action type
const SET_CATEGORY = 'board/SET_CATEGORY';
const GET_POSTS = 'board/GET_POSTS';
const GET_ARTICLE = 'board/GET_ARTICLE';
const ARTICLE_PENDING = 'board/ARTICLE_PENDING';

//function creating action
export const getPosts = (category) => async (dispatch, getState) => {
    dispatch({
        type: SET_CATEGORY,
        payload: category
    })
    const posts = await servicePosts.getPosts(category);
    console.log('getPosts');
    console.log(posts);
    dispatch({
        type: GET_POSTS,
        payload: posts
    });
}
export const getArticle = (num) => async (dispatch, getState) => {
    dispatch({type: ARTICLE_PENDING});
    const article = await servicePosts.getArticle(num);
    console.log('getArticle');
    console.log(article);
    if (article.result) {
        dispatch({
            type: GET_ARTICLE,
            payload: article.article
        });
    } else {
        window.location.replace(article.url);
    }
}

//module's initial state
const initialState = {
    category: '',
    posts: [],
    listOnReady: false,
    article: {},
    articleOnReady: false,
}

//reducer
export default function reducer (state=initialState, action) {
    switch (action.type) {
        case SET_CATEGORY :
            return { ...state, category: action.payload, listOnReady: false };
        case GET_POSTS :
            return { ...state, posts: [ ...action.payload ], listOnReady: true };
        case GET_ARTICLE : 
            const _article = { ...action.payload };
            delete _article.category;
            let cate;
            if (action.payload.category == 0) cate = 'qna';
            else if (action.payload.category == 1) cate = 'forum';
            return { ...state, category: cate, article: _article, articleOnReady: true };
        case ARTICLE_PENDING :
            return { ...state, articleOnReady: false };
        default :
            return state;
    }
}