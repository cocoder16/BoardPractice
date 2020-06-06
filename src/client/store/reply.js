import * as serviceReplies from '~c/services/replies';

const TEXT_CHANGE = 'reply/TEXT_CHANGE';
const CLEAR = 'reply/CLEAR';
const GET_REPLIES = 'reply/GET_REPLIES';
const LOAD_REPLY_FORM = 'reply/LOAD_REPLY_FORM';
const DISPLAY_OFF = 'reply/DISPLAY_OFF';
const LOAD_CONTENTS = 'reply/LOAD_CONTENTS';
const DELETE_MODE_ON = 'reply/DELETE_MODE_ON';

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
};
export const loadReplyForm = (space, id, depth) => ({
    type: LOAD_REPLY_FORM,
    payload: {space, id, depth}
});
export const displayOff = (id) => ({
    type: DISPLAY_OFF,
    payload: id
});
export const loadContents = (contents) => ({
    type: LOAD_CONTENTS,
    payload: contents
})
export const deleteModeOn = (id) => ({
    type: DELETE_MODE_ON,
    payload: id
});

const initialState = {
    contents: '',
    replies: [],
    replyForm: { space: null, id: 0, depth: 0 },
    unshown: 0,
    deleteMode: 0
};

export default function reducer (state=initialState, action) {
    switch (action.type) {
        case TEXT_CHANGE :
            return { ...state, contents: action.payload };
        case CLEAR :
            return { ...state, contents: '', replyForm: { space: null, id: 0, depth: 0 },
            unshown: 0, deleteMode: 0 };
        case GET_REPLIES :
            return { ...state, replies: action.payload };
        case LOAD_REPLY_FORM :
            return { ...state, replyForm: action.payload };
        case DISPLAY_OFF :
            return { ...state, unshown: action.payload };
        case LOAD_CONTENTS :
            return { ...state, contents: action.payload };
        case DELETE_MODE_ON :
            return { ...state, deleteMode: action.payload };
        default :
            return state;
    }
}