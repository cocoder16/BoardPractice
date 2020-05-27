import axios from 'axios';

export const isOverlapId = (targetId) => {
    return axios.get(`/check/overlapid/${targetId}`).then(res => {
        return res.data.result;
    }).catch(err => console.log(err));
}

export const isOverlapNickname = (targetNickname) => {
    return axios.get(`/check/overlapnickname/${targetNickname}`).then(res => {
        return res.data.result;
    }).catch(err => console.log(err));
}

export const createUser = (formData) => {
    axios({
        method: 'post',
        url: '/signupform',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        if (res.data.result) {
            alert('환영합니다. 회원가입이 완료되었습니다.');
            window.location.replace(res.data.url);
        } else {
            alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
        }
    }).catch(err => console.log(err));
}

export const tryLogIn = (formData) => {
    return axios({
        method: 'post',
        url: '/login',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return res.data;
    }).catch(err => console.log(err));
}

export const tryLogOut = () => {
    return axios.delete('/logout').then(res => {
        console.log(res.data);
        return res.data.result;
    }).catch(err => console.log(err));
}

export const getUserInfo = () => {
    return axios.get('/getuserinfo').then(res => {
        return res.data;
    }).catch(err => console.log(err));
}