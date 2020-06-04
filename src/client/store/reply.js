import * as serviceReplies from '~c/services/replies';

const TEXT_CHANGE = 'reply/TEXT_CHANGE';
const CLEAR = 'reply/CLEAR';
const GET_REPLIES = 'reply/GET_REPLIES';

export const textChange = (payload) => ({
    type: TEXT_CHANGE,
    payload: payload
});
export const clear = () => ({type: CLEAR});
export const getReplies = (post_id) => async (dispatch, getState) => {
    const replies = await serviceReplies.getReplies(post_id);
    console.log('getReplies');
    dispatch({
        type: GET_REPLIES,
        payload: replies
    });
}

const initialState = {
    contents: '',
    replies: []
}

export default function reducer (state=initialState, action) {
    switch (action.type) {
        case TEXT_CHANGE :
            return { ...state, contents: action.payload };
        case CLEAR :
            return { ...state, contents: '' };
        case GET_REPLIES :
            return { ...state, replies: action.payload }
        default :
            return state;
    }
}