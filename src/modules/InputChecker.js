const InputChecker = {
    id (str) {
        const reg = /^[a-z0-9]{6,12}$/; //영문 또는 숫자로, 시작하고 끝나면서 6~12자 이내 연속해야함.
        const reg1 = /[a-z]/g;
        const reg2 = /[0-9]/g;
        return (reg.test(str) && reg1.test(str) && reg2.test(str));
    },
    pw (str) {
        const reg = /^[a-z0-9`~!@#$%^&*()_+\-=\|\\\[\]{}\,.\/<>?;:'"]{8,12}$/; //영문or숫자or특문 8~12자
        const reg1 = /[a-z]/g;
        const reg2 = /[0-9]/g;
        const reg3 = /[`~!@#$%^&*()_+\-=\|\\\[\]{}\,.\/<>?;:'"]/ //특수문자 반드시 포함
        return (reg.test(str) && reg1.test(str) && reg2.test(str) && reg3.test(str));
    },
    nickname (str) {
        const reg = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,12}$/;
        return reg.test(str);
    },
    email (str) {
        const reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        return reg.test(str);
    }
};

export default InputChecker;