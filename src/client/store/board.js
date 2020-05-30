//action type
const SET_CATEGORY = 'board/SET_CATEGORY';

//function creating action
export const setCategory = (payload) => ({
    type: SET_CATEGORY,
    payload: payload
});

//module's initial state
const initialState = {
    category: ''
}

//reducer
export default function reducer (state=initialState, action) {
    switch (action.type) {
        case SET_CATEGORY :
            return { ...state, category: action.payload };
        default :
            return state;
    }
}