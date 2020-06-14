import InputChecker from '~/modules/InputChecker';

//action type
const INPUT_CHANGE = 'logIn/INPUT_CHANGE';
const FORM_VALIDATION_INPUT = 'logIn/FORM_VALIDATION_INPUT';
const LOG_IN_FAILED = 'logIn/LOG_IN_FAILED';

//function creating action
export const inputChange = (payload) => ({
    type: INPUT_CHANGE,
    payload: payload
});
export const formValidationInput = () => ({type: FORM_VALIDATION_INPUT});
export const logInFailed = () => ({type: LOG_IN_FAILED});

//module's initial state
const initialState = {
    id: '',
    pw: '',
    span: '',
    pass: ''
}

//reducer
export default function reducer (state=initialState, action) {
    switch (action.type) {
        case INPUT_CHANGE :
            return { ...state, [action.payload.name]: action.payload.value };
        case FORM_VALIDATION_INPUT :
            if (!InputChecker.id(state.id) || !InputChecker.pw(state.pw)) {
                return { ...state, span: 'Please check the ID and Password and try again.', pass: false };
            } else {
                return { ...state, span: '', pass: true };
            }
        case LOG_IN_FAILED :
            return { ...state, span: 'Please check the ID and Password and try again.', pass: false };
        default :
            return state;
    }
}