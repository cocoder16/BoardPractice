import InputChecker from '~/modules/InputChecker';
import { issueNewPw } from '~c/services/users';

const INPUT_CHANGE = 'pwReset/INPUT_CHANGE';
const FORM_VALIDATION = 'pwReset/FORM_VALIDATION';
const SENT_EMAIL = 'pwReset/SENT_EMAIL';
const REJECT_MESSAGE = 'pwReset/REJECT_MESSAGE';
const GET_NEW_PW = 'pwReset/GET_NEW_PW';
const GET_NEW_PW_FAILED = 'pwReset/GET_NEW_PWFAILED';
const REINITIAL = 'pwReset/REINITIAL';
const RE_AUTH = 'pwReset/RE_AUTH';

export const inputChange = (payload) => ({
    type: INPUT_CHANGE,
    payload: payload
});
export const formValidation = () => ({type: FORM_VALIDATION});
export const sentEmail = () => ({type: SENT_EMAIL});
export const rejectMessage = () => ({type: REJECT_MESSAGE});
export const getNewPw = (payload) => async (dispatch, getState) => {
    const id = payload.id;
    const token = payload.token;
    const resData = await issueNewPw(id, token);
    if (resData.result) {
        sessionStorage.setItem('received newPw', true);
        dispatch({
            type: GET_NEW_PW,
            payload: resData.pw
        })
    } else {
        dispatch({type: GET_NEW_PW_FAILED})
    }
}
export const reinitial = () => ({type: REINITIAL});
export const reAuth = () => ({type: RE_AUTH});

const initialState = {
    id: '',
    pass: false,
    span: '',
    isSentEmail: false,
    onPending: true,
    newPw: '',
    failed: false
}

export default function reducer (state=initialState, action) {
    switch (action.type) {
        case INPUT_CHANGE :
            return { ...state, id: action.payload }
        case FORM_VALIDATION :
            if (!InputChecker.id(state.id)) {
                return { ...state, pass: false, span: '아이디를 확인해주세요.' };
            }
            return { ...state, pass: true, span: '' };
        case SENT_EMAIL :
            return { ...state, isSentEmail: true };
        case REJECT_MESSAGE :
            return { ...state, isSentEmail: false, span: '아이디를 확인해주세요.' };
        case GET_NEW_PW :
            return { ...state, onPending: false, failed: false, newPw: action.payload };
        case GET_NEW_PW_FAILED :
            return { ...state, onPending: true, failed: true }
        case REINITIAL :
            return { ...state, onPending: false, failed: true }
        case RE_AUTH :
            return { ...state, isSentEmail: false };
        default :
            return state;
    }
}