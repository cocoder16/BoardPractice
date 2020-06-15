import axios from 'axios';
import Exception from './Exception';

export const isOverlap = (target) => {
    return axios({
        method: 'get',
        url: '/check/overlap',
        params: target
    }).then(res => {
        return res.data.result;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const createUser = (formData) => {
    axios({
        method: 'post',
        url: '/user',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        alert('Welcome to my board :)');
        window.location.replace('/');
    }).catch(err => {
        Exception.logAlertRedirect(err, 'The registration is failed. Please try again.');
    });
}

export const updateUser = (formData) => {
    axios({
        method: 'put',
        url: '/user',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        alert('User information update is completed.');
        window.location.replace('/');
    }).catch(err => {
        Exception.logAlertRedirect(err, 'User information update is failed. Please try again.');
    });
}

export const deleteUser = (formData) => {
    return axios({
        method: 'delete',
        url: '/user',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return res.data.result;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const tryLogIn = (formData) => {
    return axios({
        method: 'post',
        url: '/session/login',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return res.data.result;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const tryLogOut = () => {
    return axios({
        method: 'delete',
        url: '/session/logout',
    }).then(res => {
        return true;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const getUserInfo = () => {
    return axios({
        method: 'get',
        url: '/userinfo',
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const getUserWrote = (type, page, per) => {
    return axios({
        method: 'get',
        url: '/userwrote',
        params: {
            type, page, per
        }
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const goAuthEmail = (formData) => {
    return axios({
        method: 'post',
        url: '/help/pwreset/authemail',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return res.data.result;
    }).catch(err => {console.log(err)});
}

export const issueNewPw = (id, token) => {
    return axios({
        method: 'post',
        url: '/help/pwreset/issue',
        data: {
            id, token
        }
    }).then(res => {
        return res.data;
    }).catch(err => console.log(err));
}