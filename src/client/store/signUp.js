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
const DELETE_MODE_ON = 'signUp/DELETE_MODE_ON';
const DELETE_MODE_OFF = 'signUp/DELETE_MODE_OFF';
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
    const _name = name.split('Check')[0];
    const isOverlap = await serviceUsers.isOverlap({[_name]: getState().signUp[_name]});
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
        isOverlap.id = await serviceUsers.isOverlap({id: getState().signUp.id});
        console.log('isOverlap_id : ' + isOverlap.id); 
        isOverlap.nickname = await serviceUsers.isOverlap({nickname: getState().signUp.nickname});
        console.log('isOverlap_nickname : ' + isOverlap.nickname);
    } else {
        isOverlap.id = false;
        isOverlap.nickname = false;
        if (getState().signUp.nickname != getState().userInfo.nickname) {
            isOverlap.nickname = await serviceUsers.isOverlap(getState().signUp.nickname);
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
export const deleteModeOn = () => ({type: DELETE_MODE_ON});
export const deleteModeOff = () => ({type: DELETE_MODE_OFF});
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
                        return { ..._state, span: { ..._state.span, id: '아이디는 소문자 영문, 숫자를 조합하여 6 ~ 12자로 입력해주세요.' }}
                    } else return setEmpty(action.payload.name);
                case 'pw' :
                    _state = { ..._state, pw: _state.pw.toLowerCase(), pwConfirm: _state.pwConfirm.toLowerCase() };
                    if (!InputChecker.pw(_state.pw)) {
                        return  { ..._state, span: { ..._state.span, pw: '비밀번호는 영문, 숫자, 특수문자를 조합하여 8 ~ 12자로 입력해주세요.' }}
                    } else return setEmpty(action.payload.name);
                case 'pwConfirm' :
                    if (_state.pw !== _state.pwConfirm) {
                        return { ..._state, span: { ..._state.span, pwConfirm: '비밀번호가 일치하지 않습니다.' }}
                    } else return setEmpty(action.payload.name);
                case 'nickname' :
                    if (!InputChecker.nickname(action.payload.value)) {
                        return { ..._state, span: { ..._state.span, nickname: '닉네임은 한글(영문) 또는 숫자를 사용하여 2 ~ 12자로 입력해주세요.' }}
                    } else return setEmpty(action.payload.name);
                case 'email' :
                    if (!InputChecker.email(action.payload.value)) {
                        return { ..._state, span: { ..._state.span, email: '이메일 형식이 올바르지 않습니다.' }}
                    } else return setEmpty(action.payload.name);
            }
        case BEFORE_OVERLAP_CHECK :
            switch (action.payload) {
                case 'idCheck' :
                    if (!InputChecker.id(state.id)) {
                        return { ...state, goOverlapCheck: false } 
                    } else return { ...state, goOverlapCheck: true }
                case 'nicknameCheck' :
                    if (!InputChecker.nickname(state.nickname)) {
                        return { ...state, goOverlapCheck: false }
                    } else return { ...state, goOverlapCheck: true }
            }
        case OVERLAP_CHECK :
            console.log(action.payload);
            switch (action.payload.name) {
                case 'id' :
                    if (action.payload.isOverlap) {
                        return { ...state, span: { ...state.span, id: '이미 사용중인 아이디입니다. 다른 아이디를 사용해주세요.'}}
                    } else {
                        return { ...state, span: { ...state.span, id: '사용 가능한 아이디입니다.'}}
                    }
                case 'nickname' :
                    if (action.payload.isOverlap) {
                        return { ...state, span: { ...state.span, nickname: '이미 사용중인 닉네임입니다. 다른 닉네임을 사용해주세요.'}}
                    } else {
                        return { ...state, span: { ...state.span, nickname: '사용 가능한 닉네임입니다.'}}
                    }
            }
        case FORM_VALIDATION_INPUT :
            if (!state.isModify || state.pw.length > 0 || state.pwConfirm.length > 0) {
                if (!InputChecker.id(state.id) || !InputChecker.pw(state.pw) || state.pw !== state.pwConfirm
                || !InputChecker.nickname(state.nickname) || !InputChecker.email(state.email)) {
                    return { ...state, pass: false };
                } else return { ...state, pass: true };
            } else {
                console.log('me');
                if (!InputChecker.nickname(state.nickname) || !InputChecker.email(state.email)) {
                    return { ...state, pass: false };
                } else return { ...state, pass: true };
            }
        case FORM_VALIDATION_OVERLAP :
            _state = { ...state };
            if (action.payload.id) {
                _state = { ..._state, pass: false, span: { ..._state.span, id: '이미 사용중인 아이디입니다. 다른 아이디를 사용해주세요.'} };
            }
            if (action.payload.nickname) {
                _state = { ..._state, pass: false, span: { ..._state.span, nickname: '이미 사용중인 닉네임입니다. 다른 닉네임을 사용해주세요.'} };
            }
            return _state;
        case SET_IS_MODIFY :
            return { ...state, isModify: action.payload }
        case SET_INPUT_VALUE :
            return { ...state, id: action.payload.id, nickname: action.payload.nickname, email: action.payload.email }
        case CLEAR :
            return { ...state, span: { ...state.span, id: '', pw: '', pwConfirm: '', nickname: '', email: '' } }
        case DELETE_MODE_ON :
            return { ...state, isDeleteMode: true }
        case DELETE_MODE_OFF :
            return { ...state, isDeleteMode: false, deleteFailedMessage: '' }
        case DELETE_FAILED :
            return { ...state, deleteFailedMessage: '비밀번호가 틀렸습니다.' }
        case PW_VALIDATION :
            if (!InputChecker.pw(action.payload)) return { ...state, deleteFailedMessage: '비밀번호가 틀렸습니다.' }
            else return { ...state, deleteFailedMessage: '' }
        default :
            return state;
    }
}