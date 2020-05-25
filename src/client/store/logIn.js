import InputChecker from '~/modules/InputChecker';

//action type
const INPUT_CHANGE = 'logIn/INPUT_CHANGE';
const FORM_VALIDATION_INPUT = 'logIn/FORM_VALIDATION_INPUT';
const LOG_IN_FAILED = 'logIn/LOG_IN_FAILED';
const LOG_IN_SUCCESSFUL = 'logIn/LOG_IN_SUCCESSFUL';

//function creating action
export const inputChange = (payload) => ({
    type: INPUT_CHANGE,
    payload: payload
});
export const formValidationInput = () => ({type: FORM_VALIDATION_INPUT});
export const logInFailed = () => ({type: LOG_IN_FAILED});
export const logInSuccessful = () => ({type: LOG_IN_SUCCESSFUL});

//module's initial state
const initialState = {
    id: '',
    pw: '',
    span: '',
    pass: '',
    isLoggedIn: false
}

//reducer
export default function reducer (state=initialState, action) {
    switch (action.type) {
        case INPUT_CHANGE :
            return { ...state, [action.payload.name]: action.payload.value };
        case FORM_VALIDATION_INPUT :
            if (!InputChecker.id(state.id) || !InputChecker.pw(state.pw)) {
                return { ...state, span: '아이디와 비밀번호를 확인해주세요.', pass: false };
            } else return { ...state, span: '', pass: true };
        case LOG_IN_FAILED :
            return { ...state, span: '아이디와 비밀번호를 확인해주세요.', pass: false };
        case LOG_IN_SUCCESSFUL :
            return { ...state, isLoggedIn: true }
        default :
            return state;
    }
}