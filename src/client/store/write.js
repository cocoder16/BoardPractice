//action type
const INPUT_CHANGE = 'write/INPUT_CHANGE';
const SET_IS_MODIFY = 'write/SET_IS_MODIFY';
const CLEAR = 'write/CLEAR';
const SET_INPUT_VALUE = 'write/SET_INPUT_VALUE'

//function creating action
export const inputChange = (payload) => ({
    type: INPUT_CHANGE,
    payload: payload
});
export const setIsModify = (isModify) => ({
    type: SET_IS_MODIFY,
    payload: isModify
});
export const clear = () => {
    return {type: CLEAR};
};
export const setInputValue = (payload) => ({
    type: SET_INPUT_VALUE,
    payload: payload
});

//module's initial state
const initialState = {
    title: '',
    contents: '',
    isModify: false
};

//reducer
export default function reducer (state=initialState, action) {
    switch (action.type) {
        case INPUT_CHANGE :
            return { ...state, [action.payload.name]: action.payload.value };
        case SET_IS_MODIFY :
            return { ...state, isModify: action.payload };
        case CLEAR :
            return { ...state, title: '', contents: '' };
        case SET_INPUT_VALUE :
            return { ...state, title: action.payload.title, contents: action.payload.contents }
        default :
            return state;
    }
}

