import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import "@testing-library/react/dont-cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import {Provider} from 'react-redux';
// import store from '~c/store/index';
import configureStore from 'redux-mock-store';
import SignUpForm from '~c/containers/SignUpForm';

const mockStore = configureStore();
const store = mockStore({
    signUp: {
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
})

const tree = render(
    <Provider store={store}>
        <SignUpForm/>
    </Provider>
);

const { getByTestId } = tree;

const fh_id = getByTestId('fh_id');
const fh_pw = getByTestId('fh_pw');
const fh_pwConfirm = getByTestId('fh_pwConfirm');
const fh_nick = getByTestId('fh_nick');
const fh_email = getByTestId('fh_email');

const input_id = getByTestId('input_id');
const input_pw = getByTestId('input_pw');
const input_pwConfirm = getByTestId('input_pwConfirm');
const input_nick = getByTestId('input_nick');
const input_email = getByTestId('input_email');

const span_idCheck = getByTestId('span_idCheck');
const span_pwCheck = getByTestId('span_pwCheck');
const span_pwConfirmCheck = getByTestId('span_pwConfirmCheck');
const span_nickCheck = getByTestId('span_nickCheck');
const span_emailCheck = getByTestId('span_emailCheck');

const btn_idConfirm = getByTestId('btn_idConfirm');
const btn_nickConfirm = getByTestId('btn_nickConfirm');
const btn_submit = getByTestId('btn_submit');

it ("snapshot", () => { 
    expect(tree.container).toMatchSnapshot();
})

//id, pw, nick, email
describe("rendering", () => {    
    test ("form table headers", () => {
        expect(fh_id).toHaveTextContent('아이디');
        expect(fh_pw).toHaveTextContent('비밀번호');
        expect(fh_pwConfirm).toHaveTextContent('비밀번호 확인');
        expect(fh_nick).toHaveTextContent('닉네임');
        expect(fh_email).toHaveTextContent('이메일');
        expect(span_idCheck).toHaveTextContent('');
        expect(span_pwCheck).toHaveTextContent('');
        expect(span_pwConfirmCheck).toHaveTextContent('');
        expect(span_nickCheck).toHaveTextContent('');
        expect(span_emailCheck).toHaveTextContent('');
        expect(btn_idConfirm).toHaveValue('중복체크');
        expect(btn_nickConfirm).toHaveValue('중복체크');
    });
})

describe("realtime checker", () => {
    // 회원가입폼(제출전검사) - id 형식 실시간체크
    test ("id short", () => {
        //id입력 -> 이벤트핸들러가 호출되겠지?
        fireEvent.change(input_id, 'abcde');
        //그 결과 출력값은 이래야함.
        expect(span_idCheck).toHaveTextContent('아이디는 소문자 영문, 숫자를 조합하여 6 ~ 12자로 입력해주세요');
    });

    test ("id long", () => {
        fireEvent.change(input_id, 'abcde01234abc');
        expect(span_idCheck).toHaveTextContent('아이디는 소문자 영문, 숫자를 조합하여 6 ~ 12자로 입력해주세요');
    });

    test ("id special character", () => {
        fireEvent.change(input_id, 'abcd0$');
        expect(span_idCheck).toHaveTextContent('아이디는 소문자 영문, 숫자를 조합하여 6 ~ 12자로 입력해주세요');
    });

    test ("id 한글", () => {
        fireEvent.change(input_id, '한글아이디다');
        expect(span_idCheck).toHaveTextContent('아이디는 소문자 영문, 숫자를 조합하여 6 ~ 12자로 입력해주세요');
    });

    test ("id only eng", () => {
        fireEvent.change(input_id, 'abcdef');
        expect(span_idCheck).toHaveTextContent('아이디는 소문자 영문, 숫자를 조합하여 6 ~ 12자로 입력해주세요');
    });

    test ("id capital letter", () => {
        fireEvent.change(input_id, 'Abcd01');
        expect(span_idCheck).toHaveTextContent('아이디는 소문자 영문, 숫자를 조합하여 6 ~ 12자로 입력해주세요');
    });

    test ("id only num", () => {
        fireEvent.change(input_id, '0123456789012');
        expect(span_idCheck).toHaveTextContent('아이디는 소문자 영문, 숫자를 조합하여 6 ~ 12자로 입력해주세요');
    });

    test ("id correct", () => {
        fireEvent.change(input_id, 'abcd01');
        expect(span_idCheck).toHaveTextContent('');
    });

    // 회원가입폼(제출전검사) - 비밀번호 형식 실시간체크
    test ("pw short", () => {
        fireEvent.change(input_pw, 'abcd01#');
        expect(span_pwCheck).toHaveTextContent('비밀번호는 영문, 숫자, 특수문자를 조합하여 8 ~ 12자로 입력해주세요.');
    });

    test ("pw long", () => {
        fireEvent.change(input_pw, 'abcde01234!@#');
        expect(span_pwCheck).toHaveTextContent('비밀번호는 영문, 숫자, 특수문자를 조합하여 8 ~ 12자로 입력해주세요.');
    });

    test ("pw except eng", () => {
        fireEvent.change(input_pw, '01234!@#$%');
        expect(span_pwCheck).toHaveTextContent('비밀번호는 영문, 숫자, 특수문자를 조합하여 8 ~ 12자로 입력해주세요.');
    });

    test ("pw except num", () => {
        fireEvent.change(input_pw, 'abcde!@#$%');
        expect(span_pwCheck).toHaveTextContent('비밀번호는 영문, 숫자, 특수문자를 조합하여 8 ~ 12자로 입력해주세요.');
    });

    test ("pw except spe", () => {
        fireEvent.change(input_pw, '01234abcde');
        expect(span_pwCheck).toHaveTextContent('비밀번호는 영문, 숫자, 특수문자를 조합하여 8 ~ 12자로 입력해주세요.');
    });

    test ("pw correct", () => {
        fireEvent.change(input_pw, 'Abcde01234!@');
        expect(span_pwCheck).toHaveTextContent('');
    });

    // 회원가입폼(제출전검사) - 비밀번호 재확인 실시간체크
    test ("pw confirm not passed", () => {
        fireEvent.change(input_pw, 'abcde01234!@');
        fireEvent.change(input_pwConfirm, 'abcde0123!');
        expect(span_pwConfirmCheck).toHaveTextContent('비밀번호가 일치하지 않습니다.');
    });

    test ("pw confirm passed", () => {
        fireEvent.change(input_pw, 'abcde01234!@');
        fireEvent.change(input_pwConfirm, 'abcde01234!@');
        expect(span_pwConfirmCheck).toHaveTextContent('');
    });

    // 회원가입폼(제출전검사) - 닉네임형식 실시간체크
    test ("nick short", () => {
        fireEvent.change(input_nick, '한');
        expect(span_nickCheck).toHaveTextContent('닉네임은 한글(영문) 또는 숫자를 사용하여 2 ~ 12자로 입력해주세요.');
    });

    test ("nick long", () => {
        fireEvent.change(input_nick, '열세글자입니다012345');
        expect(span_nickCheck).toHaveTextContent('닉네임은 한글(영문) 또는 숫자를 사용하여 2 ~ 12자로 입력해주세요.');
    });

    test ("nick special character", () => {
        fireEvent.change(input_nick, '특수문자포함!');
        expect(span_nickCheck).toHaveTextContent('닉네임은 한글(영문) 또는 숫자를 사용하여 2 ~ 12자로 입력해주세요.');
    });

    test ("nick only 한글", () => {
        fireEvent.change(input_nick, '한글닉네임');
        expect(span_nickCheck).toHaveTextContent('');
    });

    test ("nick only eng", () => {
        fireEvent.change(input_nick, 'Englishnick');
        expect(span_nickCheck).toHaveTextContent('');
    });

    test ("nick only num", () => {
        fireEvent.change(input_nick, '0123');
        expect(span_nickCheck).toHaveTextContent('');
    });

    test ("nick combination", () => {
        fireEvent.change(input_nick, '한글Eng123');
        expect(span_nickCheck).toHaveTextContent('');
    });

    // 회원가입폼(제출전검사) - email형식 실시간체크
    test ("email except @ .", () => {
        fireEvent.change(input_email, '0123abccom');
        expect(span_emailCheck).toHaveTextContent('이메일 형식이 올바르지 않습니다.');
    });

    test ("email except @", () => {
        fireEvent.change(input_email, '0123abc.com');
        expect(span_emailCheck).toHaveTextContent('이메일 형식이 올바르지 않습니다.');
    });

    test ("email except .", () => {
        fireEvent.change(input_email, '0123@abccom');
        expect(span_emailCheck).toHaveTextContent('이메일 형식이 올바르지 않습니다.');
    });

    test ("email correct", () => {
        fireEvent.change(input_email, '0123@abc.com');
        expect(span_emailCheck).toHaveTextContent('');
    });
})

describe("btn checker", () => {
    // 회원가입폼(제출전검사) - 버튼으로 id 중복체크
    test ("id overlap", () => {
        fireEvent.change(input_id, 'admin0'); //DB에 저장된 값
        fireEvent.click(btn_idConfirm); //다끝나고오지않을까?
        // await wait(() => {
        //     getByText('이미 사용중인 아이디입니다. 다른 아이디를 사용해주세요.');
        // })
        expect(span_idCheck).toHaveTextContent('이미 사용중인 아이디입니다. 다른 아이디를 사용해주세요.');
    });

    test ("id overlap", () => {
        fireEvent.change(input_id, 'admin1'); //DB에 저장되지않은 값
        fireEvent.click(btn_idConfirm);
        expect(span_idCheck).toHaveTextContent('사용 가능한 아이디입니다.');
    });

    // 회원가입폼(제출전검사) - 버튼으로 닉네임 중복체크
    test ("nick overlap", () => {
        fireEvent.change(input_nick, '관리자'); //DB에 저장된 값
        fireEvent.click(btn_nickConfirm);
        expect(span_nickCheck).toHaveTextContent('이미 사용중인 닉네임입니다. 다른 닉네임을 사용해주세요.');
    });

    test ("nick overlap", () => {
        fireEvent.change(input_nick, '관리자1'); //DB에 저장되지않은 값
        fireEvent.click(btn_nickConfirm);
        expect(span_nickCheck).toHaveTextContent('사용 가능한 닉네임입니다.');
    });
})

describe("form validation onsubmit", () => {
    window.alert = () => {};
    const spyAlert = jest.spyOn(window, 'alert');
    // 회원가입폼(제출검사) - id 중복체크 및 6~12자 영문,숫자조합 검사
    test ("submit faild due to id", async () => {
        fireEvent.click(btn_submit)
        expect(spyAlert).toHaveBeenCalledTimes(1);
        expect(spyAlert).toHaveBeenCalledWith('가입 양식을 다시 확인해주세요.');
    });
    // 회원가입폼(제출검사) - pw 재확인일치 체크 및 8~12자 영문,숫자,특수문자 조합 검사
    test ("submit faild due to pw", () => {
        fireEvent.change(input_id, 'abcd0123');
        fireEvent.change(input_pw, '01234567');
        fireEvent.click(btn_submit);
        expect(spyAlert).toHaveBeenCalledTimes(1);
        expect(spyAlert).toHaveBeenCalledWith('가입 양식을 다시 확인해주세요.');
    });
    // 회원가입폼(제출검사) - 닉네임 중복체크 및 2~12자 한글 또는 영문 또는 숫자 검사
    test ("submit faild due to nick", () => {
        fireEvent.change(input_id, 'abcd0123');
        fireEvent.change(input_pw, '01234567');
        fireEvent.change(input_pw, '01234567');
        fireEvent.change(input_nick, ' ');
        fireEvent.click(btn_submit);
        expect(spyAlert).toHaveBeenCalledTimes(1);
        expect(spyAlert).toHaveBeenCalledWith('가입 양식을 다시 확인해주세요.');
    });
    // 회원가입폼(제출검사) - email형식체크
    test ("submit faild due to email", () => {
        fireEvent.change(input_id, 'abcd0123');
        fireEvent.change(input_pw, '01234567');
        fireEvent.change(input_pw, '01234567');
        fireEvent.change(input_nick, 'eee');
        fireEvent.change(input_email, 'eee@gggcom');
        fireEvent.click(btn_submit);
        expect(spyAlert).toHaveBeenCalledTimes(1);
        expect(spyAlert).toHaveBeenCalledWith('가입 양식을 다시 확인해주세요.');
    });

    test ("submit success", () => {
        fireEvent.change(input_id, 'abcd0123');
        fireEvent.change(input_pw, '01234567');
        fireEvent.change(input_pw, '01234567');
        fireEvent.change(input_nick, 'eee');
        fireEvent.change(input_email, 'eee@ggg.com');
        fireEvent.click(btn_submit);
        expect(spyAlert).toHaveBeenCalledTimes(1);
        expect(spyAlert).toHaveBeenCalledWith('환영합니다. 회원가입이 완료되었습니다.');
    });
})

