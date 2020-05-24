import InputChecker from '~/modules/InputChecker';
import * as serviceUsers from '~c/services/users';

//action type
const INPUT_CHANGE = 'signUp/INPUT_CHANGE';
const BEFORE_OVERLAP_CHECK = 'signUp/BEFORE_OVERLAP_CHECK';
const OVERLAP_CHECK = 'signUp/OVERLAP_CHECK';
const FORM_VALIDATION_INPUT = 'signUp/FORM_VALIDATION_INPUT';
const FORM_VALIDATION_OVERLAP = 'signUp/FORM_VALIDATION_OVERLAP';

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
    let isOverlap;
    switch (name) {
        case 'idCheck' :
            isOverlap = await serviceUsers.isOverlapId(getState().signUp.id);
            console.log('isOverlap : ' + isOverlap);
            dispatch({
                type: OVERLAP_CHECK,
                payload: {
                    name: 'id',
                    isOverlap: isOverlap
                }
            });
            break;
        case 'nicknameCheck' :
            isOverlap = await serviceUsers.isOverlapNickname(getState().signUp.nickname);
            console.log('isOverlap : ' + isOverlap);
            dispatch({
                type: OVERLAP_CHECK,
                payload: {
                    name: 'nickname',
                    isOverlap: isOverlap
                }
            });
            break;
    }
}
export const formValidationInput = () => ({type: FORM_VALIDATION_INPUT});
export const formValidationOverlap = () => async (dispatch, getState) => {
    const isOverlap_id = await serviceUsers.isOverlapId(getState().signUp.id);
    console.log('isOverlap_id : ' + isOverlap_id);
    const isOverlap_nickname = await serviceUsers.isOverlapNickname(getState().signUp.nickname);
    console.log('isOverlap_nickname : ' + isOverlap_nickname);
    return {
        type: FORM_VALIDATION_OVERLAP,
        payload: {
            isOverlap_id: isOverlap_id,
            isOverlap_nickname: isOverlap_nickname
        }
    };
}

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
    pass: ''
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
            _state = { ...state };
            if (!InputChecker.id(_state.id) || !InputChecker.pw(_state.pw) || _state.pw !== _state.pwConfirm
            || !InputChecker.nickname(_state.nickname) || !InputChecker.email(_state.email)) {
                return { ..._state, pass: false };
            }
            return { ..._state, pass: true };
        case FORM_VALIDATION_OVERLAP :
            _state = { ...state };
            if (action.payload.isOverlap_id) {
                _state = { ..._state, pass: false, span: { ..._state.span, id: '이미 사용중인 아이디입니다. 다른 아이디를 사용해주세요.'} };
            }
            if (action.payload.isOverlap_nickname) {
                _state = { ..._state, pass: false, span: { ..._state.span, nickname: '이미 사용중인 닉네임입니다. 다른 닉네임을 사용해주세요.'} };
            }
            return _state;
        default :
            return state;
    }
}