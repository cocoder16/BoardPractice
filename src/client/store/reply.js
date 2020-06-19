import * as serviceReplies from '~c/services/replies';

const TEXT_CHANGE = 'reply/TEXT_CHANGE';
const CLEAR = 'reply/CLEAR';
const GET_REPLIES = 'reply/GET_REPLIES';
const LOAD_REPLY_FORM = 'reply/LOAD_REPLY_FORM';
const DISPLAY_OFF = 'reply/DISPLAY_OFF';
const LOAD_CONTENTS = 'reply/LOAD_CONTENTS';
const ON_DELETE_MODE = 'reply/ON_DELETE_MODE';
const CLEAR_REPLIES = 'reply/CLEAR_REPLIES';
const PENDING_REPLIES = 'reply/PENDING_REPLIES';
const SET_SCROLL = 'reply/SET_SCROLL';

export const textChange = (value) => ({
    type: TEXT_CHANGE,
    payload: value
});
export const clear = () => ({type: CLEAR});
export const getReplies = (post_id) => async (dispatch, getState) => {
    dispatch({type: PENDING_REPLIES})
    const replies = await serviceReplies.getReplies(post_id);
    console.log('getReplies');
    dispatch({
        type: GET_REPLIES,
        payload: replies
    });
};
export const loadReplyForm = (space, id, depth, parent_nickname) => ({
    type: LOAD_REPLY_FORM,
    payload: { space, id, depth, parent_nickname }
});
export const displayOff = (id) => ({
    type: DISPLAY_OFF,
    payload: id
});
export const loadContents = (contents) => ({
    type: LOAD_CONTENTS,
    payload: contents
});
export const onDeleteMode = (id) => ({
    type: ON_DELETE_MODE,
    payload: id
});
export const clearReplies = () => ({type: CLEAR_REPLIES});
export const setScroll = (top) => ({
    type: SET_SCROLL,
    payload: top
})

const initialState = {
    contents: '',
    replies: [],
    replyForm: { space: null, id: 0, depth: 0, tarEle: null, parent_nickname: null },
    unshown: 0,
    deleteMode: 0,
    onPending: false,
    scrollTop: 0,
};

export default function reducer (state=initialState, action) {
    switch (action.type) {
        case TEXT_CHANGE :
            return { ...state, contents: action.payload };
        case CLEAR :
            return { ...state, contents: '', replyForm: { space: null, id: 0, depth: 0, tarEle: null, parent_nickname: null },
                unshown: 0, deleteMode: 0 };
        case GET_REPLIES :
            return { ...state, replies: action.payload, onPending: false };
        case LOAD_REPLY_FORM :
            return { ...state, replyForm: action.payload };
        case DISPLAY_OFF :
            return { ...state, unshown: action.payload };
        case LOAD_CONTENTS :
            return { ...state, contents: action.payload };
        case ON_DELETE_MODE :
            return { ...state, deleteMode: action.payload };
        case CLEAR_REPLIES :
            return { ...state, replies: [], replyForm: { space: null, id: 0, depth: 0, tarEle: null, parent_nickname: null } };
        case PENDING_REPLIES :
            return { ...state, onPending: true };
        case SET_SCROLL :
            return { ...state, scrollTop: action.payload }
        default :
            return state;
    }
}