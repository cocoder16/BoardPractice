import * as serviceUsers from '~c/services/users';

//action type
const GETTING_START = 'userInfo/GETTING_START';
const SET_USER_INFO = 'userInfo/SET_USER_INFO';
const DELETE_USER_INFO = 'userInfo/DELETE_USER_INFO';

//function creating action
export const getUserInfo = () => async (dispatch, getState) => {
    dispatch({type: GETTING_START});
    const data = await serviceUsers.getUserInfo();
    if (data.result){
        dispatch({
            type: SET_USER_INFO,
            payload: data.userInfo
        });
    } else dispatch({type: DELETE_USER_INFO});
};
export const deleteUserInfo = () => ({type: DELETE_USER_INFO});

//module's initial state
const initialState = {
    onPending: true,
    isLoggedIn: false,
    id: '',
    nickname: '',
    email: '',
    articleIdArr: []
}

//reducer
export default function reducer (state=initialState, action) {
    switch (action.type) {
        case GETTING_START :
            return { ...state, onPending: true }
        case SET_USER_INFO :
            console.log(action.payload);
            return { ...state, onPending: false, isLoggedIn: true, id: action.payload.id, 
                nickname: action.payload.nickname, email: action.payload.email, 
                articleIdArr: action.payload.articleIdArr }
        case DELETE_USER_INFO :
            return { ...state, onPending: false, isLoggedIn: false, id: '', nickname: '', email: '' }
        default :
            return state;
    }
}