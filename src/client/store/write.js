//action type
const INPUT_CHANGE = 'write/INPUT_CHANGE';
const SET_IS_MODIFY = 'write/SET_IS_MODIFY';

//function creating action
export const inputChange = (payload) => ({
    type: INPUT_CHANGE,
    payload: payload
});
export const setIsModify = (isModify) => ({
    type: SET_IS_MODIFY,
    payload: isModify
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
        default :
            return state;
    }
}

