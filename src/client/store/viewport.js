const SET_DEVICE_TYPE = 'viewport/SET_DEVICE_TYPE';

export const setDeviceType = (payload) => ({
    type: SET_DEVICE_TYPE,
    payload: payload
});

const initialState = {
    type: 0
}

export default function reducer (state=initialState, action) {
    switch (action.type) {
        case SET_DEVICE_TYPE :
            return { ...state, type: action.payload }
        default :
            return state;
    }
}