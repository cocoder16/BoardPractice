import InputChecker from '~/modules/InputChecker';

const TEXT_CHANGE = 'reply/TEXT_CHANGE';
const CLEAR = 'reply/CLEAR';

export const textChange = (payload) => ({
    type: TEXT_CHANGE,
    payload: payload
});
export const clear = () => ({type: CLEAR});

const initialState = {
    contents: '',
}

export default function reducer (state=initialState, action) {
    switch (action.type) {
        case TEXT_CHANGE :
            return { ...state, contents: action.payload };
        case CLEAR :
            return { ...state, contents: '' };
        default :
            return state;
    }
}