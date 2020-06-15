import InputChecker from '~/modules/InputChecker';
import * as serviceUsers from '~c/services/users';

//action type
const INPUT_CHANGE = 'signUp/INPUT_CHANGE';
const BEFORE_OVERLAP_CHECK = 'signUp/BEFORE_OVERLAP_CHECK';
const OVERLAP_CHECK = 'signUp/OVERLAP_CHECK';
const FORM_VALIDATION_INPUT = 'signUp/FORM_VALIDATION_INPUT';
const FORM_VALIDATION_OVERLAP = 'signUp/FORM_VALIDATION_OVERLAP';
const SET_IS_MODIFY = 'signUp/SET_IS_MODIFY';
const SET_INPUT_VALUE = 'signUp/SET_INPUT_VALUE';
const CLEAR = 'signUpCLEAR';
const ON_DELETE_MODE = 'signUp/ON_DELETE_MODE';
const OFF_DELETE_MODE = 'signUp/OFF_DELETE_MODE';
const DELETE_FAILED = 'signUp/DELETE_FAILED';
const PW_VALIDATION = 'signUp/PW_VALIDATION';

//function creating action
export const inputChange = (payload) => ({
    type: INPUT_CHANGE,
    payload: payload
});
export const beforeOverlapCheck = (name) => ({
    type: BEFORE_OVERLAP_CHECK,
    payload: name
})
export const overlapCheck = (name) => async (dispatch, getState) => {
    if (getState().signUp.isModify && getState().userInfo.nickname == getState().signUp.nickname) return null;
    let _name = name.split('Check')[0];
    const isOverlap = await serviceUsers.isOverlap({ [_name]: getState().signUp[_name] });
    
    console.log('isOverlap : ' + isOverlap);
    dispatch({
        type: OVERLAP_CHECK,
        payload: {
            name: _name,
            isOverlap: isOverlap
        }
    });
}
export const formValidationInput = () => ({type: FORM_VALIDATION_INPUT});
export const formValidationOverlap = () => async (dispatch, getState) => {
    let isOverlap = {};
    if (!getState().signUp.isModify) {
        isOverlap.id = await serviceUsers.isOverlap({ id: getState().signUp.id });
        console.log('isOverlap_id : ' + isOverlap.id); 
        isOverlap.nickname = await serviceUsers.isOverlap({ nickname: getState().signUp.nickname });
        console.log('isOverlap_nickname : ' + isOverlap.nickname);
    } else {
        isOverlap.id = false;
        isOverlap.nickname = false;
        if (getState().signUp.nickname != getState().userInfo.nickname) {
            isOverlap.nickname = await serviceUsers.isOverlap({ nickname: getState().signUp.nickname });
            console.log('isOverlap_nickname : ' + isOverlap.nickname);
        }
    }
   
    return {
        type: FORM_VALIDATION_OVERLAP,
        payload: isOverlap
    };
};
export const setIsModify = (isModify) => ({
    type: SET_IS_MODIFY,
    payload: isModify
});
export const setInputValue = (payload) => ({
    type: SET_INPUT_VALUE,
    payload: payload
})
export const clear = () => ({type: CLEAR});
export const onDeleteMode = () => ({type: ON_DELETE_MODE});
export const offDeleteMode = () => ({type: OFF_DELETE_MODE});
export const deleteFailed = () => ({type: DELETE_FAILED});
export const pwValidation = (pw) => ({
    type: PW_VALIDATION,
    payload: pw
})

//module's initial state
const initialState = {
    id: '',
    pw: '',
    pwConfirm: '',
    nickname: '',
    email: '',
    span: {
        id: '',
        pw: '',
        pwConfirm: '',
        nickname: '',
        email: ''
    },
    goOverlapCheck: '',
    pass: '',
    isModify: false,
    isDeleteMode: false,
    deleteFailedMessage: ''
}

//reducer
export default function reducer (state=initialState, action) {
    let _state;
    switch (action.type) {
        case INPUT_CHANGE :
            _state = { ...state};
            _state = { ..._state, [action.payload.name]: action.payload.value };
            const setEmpty = (name) => {
                return { ..._state, span: { ..._state.span, [name]: ''}}
            } 
            switch (action.payload.name) {
                case 'id':
                    if (!InputChecker.id(action.payload.value)) {
                        return { ..._state, span: { ..._state.span, id: '6~12 characters. Small letters and digits only.' }}
                    } else {
                        return setEmpty(action.payload.name);
                    }
                case 'pw' :
                    _state = { ..._state, pw: _state.pw.toLowerCase(), pwConfirm: _state.pwConfirm.toLowerCase() };
                    if (!InputChecker.pw(_state.pw)) {
                        return  { ..._state, span: { ..._state.span, pw: '8~12 charactrers. Should contain small letter, number and specail character.' }}
                    } else {
                        return setEmpty(action.payload.name);
                    }
                case 'pwConfirm' :
                    if (_state.pw !== _state.pwConfirm) {
                        return { ..._state, span: { ..._state.span, pwConfirm: 'Not the same password.' }}
                    } else {
                        return setEmpty(action.payload.name);
                    }
                case 'nickname' :
                    if (!InputChecker.nickname(action.payload.value)) {
                        return { ..._state, span: { ..._state.span, nickname: '2~12 characters. digits, Korean or English only.' }}
                    } else {
                        return setEmpty(action.payload.name);
                    }
                case 'email' :
                    if (!InputChecker.email(action.payload.value)) {
                        return { ..._state, span: { ..._state.span, email: 'Invalid email.' }}
                    } else {
                        return setEmpty(action.payload.name);
                    }
            }
        case BEFORE_OVERLAP_CHECK :
            switch (action.payload) {
                case 'idCheck' :
                    if (!InputChecker.id(state.id)) {
                        return { ...state, goOverlapCheck: false } 
                    } else {
                        return { ...state, goOverlapCheck: true }
                    }
                case 'nicknameCheck' :
                    if (!InputChecker.nickname(state.nickname)) {
                        return { ...state, goOverlapCheck: false }
                    } else {
                        return { ...state, goOverlapCheck: true }
                    }
            }
        case OVERLAP_CHECK :
            console.log(action.payload);
            switch (action.payload.name) {
                case 'id' :
                    if (action.payload.isOverlap) {
                        return { ...state, span: { ...state.span, id: 'This ID is already taken. Please use another ID.' }}
                    } else {
                        return { ...state, span: { ...state.span, id: 'This ID is available.' }}
                    }
                case 'nickname' :
                    if (action.payload.isOverlap) {
                        return { ...state, span: { ...state.span, nickname: 'This nickname is already taken. Please use another nickname.' }}
                    } else {
                        return { ...state, span: { ...state.span, nickname: 'This nickname is available.' }}
                    }
            }
        case FORM_VALIDATION_INPUT :
            if (!state.isModify || state.pw.length > 0 || state.pwConfirm.length > 0) {
                if (!InputChecker.id(state.id) || !InputChecker.pw(state.pw) || state.pw !== state.pwConfirm
                || !InputChecker.nickname(state.nickname) || !InputChecker.email(state.email)) {
                    return { ...state, pass: false };
                } else {
                    return { ...state, pass: true };
                }
            } else {
                console.log('me');
                if (!InputChecker.nickname(state.nickname) || !InputChecker.email(state.email)) {
                    return { ...state, pass: false };
                } else {
                    return { ...state, pass: true };
                }
            }
        case FORM_VALIDATION_OVERLAP :
            _state = { ...state };
            if (action.payload.id) {
                _state = { ..._state, pass: false, span: { ..._state.span, id: 'This ID is already taken. Please use another ID.' }};
            }
            if (action.payload.nickname) {
                _state = { ..._state, pass: false, span: { ..._state.span, nickname: 'This nickname is already taken. Please use another nickname.' }};
            }
            return _state;
        case SET_IS_MODIFY :
            return { ...state, isModify: action.payload }
        case SET_INPUT_VALUE :
            return { ...state, id: action.payload.id, nickname: action.payload.nickname, email: action.payload.email }
        case CLEAR :
            return { ...state, span: { ...state.span, id: '', pw: '', pwConfirm: '', nickname: '', email: '' }}
        case ON_DELETE_MODE :
            return { ...state, isDeleteMode: true }
        case OFF_DELETE_MODE :
            return { ...state, isDeleteMode: false, deleteFailedMessage: '' }
        case DELETE_FAILED :
            return { ...state, deleteFailedMessage: 'Wrong password.' }
        case PW_VALIDATION :
            if (!InputChecker.pw(action.payload)) {
                return { ...state, deleteFailedMessage: 'Wrong password.' }
            } else {
                return { ...state, deleteFailedMessage: '' }
            } 
        default :
            return state;
    }
}