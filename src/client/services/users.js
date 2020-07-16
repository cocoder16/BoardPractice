import axios from 'axios';
import Exception from './Exception';

export const isOverlap = async (target) => {
    return axios({
        method: 'get',
        url: '/is-overlap',
        params: target,
        headers: { Pragma: 'no-cache' }
    }).then(res => {
        return res.data.result;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const createUser = async (formData) => {
    return axios({
        method: 'post',
        url: '/user',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        alert('Welcome to my board :)');
        return;
    }).catch(err => {
        Exception.logAlertRedirect(err, 'The registration is failed. Please try again.');
    });
}

export const updateUser = async (formData) => {
    return axios({
        method: 'put',
        url: '/user',
        data: formData,
        headers: { 
            'content-type': 'multipart/form-data',
            Pragma: 'no-cache'
        }
    }).then(res => {
        alert('User information update is completed.');
        return;
    }).catch(err => {
        Exception.logAlertRedirect(err, 'User information update is failed. Please try again.');
    });
}

export const deleteUser = async (formData) => {
    return axios({
        method: 'delete',
        url: '/user',
        data: formData,
        headers: { 
            'content-type': 'multipart/form-data',
            Pragma: 'no-cache'
        }
    }).then(res => {
        return res.data.result;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const tryLogIn = async (formData) => {
    return axios({
        method: 'post',
        url: '/session/user',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return res.data.result;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const tryLogOut = async () => {
    return axios({
        method: 'delete',
        url: '/session/user',
        headers: { Pragma: 'no-cache' }
    }).then(res => {
        return;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const getUserInfo = async () => {
    return axios({
        method: 'get',
        url: '/userinfo',
        headers: { Pragma: 'no-cache' }
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const getUserWrote = async (type, page, per) => {
    return axios({
        method: 'get',
        url: '/userwrote',
        params: {
            type, page, per
        },
        headers: { Pragma: 'no-cache' }
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const goAuthEmail = async (formData) => {
    return axios({
        method: 'post',
        url: '/authemail',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return res.data.result;
    }).catch(err => {console.log(err)});
}

export const issueNewPw = async (formData) => {
    return axios({
        method: 'post',
        url: '/newpw',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return res.data;
    }).catch(err => console.log(err));
}