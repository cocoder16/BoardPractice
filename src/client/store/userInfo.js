//action type
const USER_INFO_SET = 'userInfo/USER_INFO_SET';

//function creating action
export const userInfoSet = (payload) => ({
    type: USER_INFO_SET,
    payload: payload
});

//module's initial state
const initialState = {
    id: '',
    nickname: '',
    email: ''
}

//reducer
export default function reducer (state=initialState, action) {
    switch (action.type) {
        case USER_INFO_SET :
            return { ...state, id: action.payload.id, nickname: action.payload.nickname,
                email: action.payload.email }
        default :
            return state;
    }
}