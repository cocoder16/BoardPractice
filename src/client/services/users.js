import axios from 'axios';

export const isOverlap = (target) => {
    return axios({
        method: 'get',
        url: '/check/overlap',
        params: target
    }).then(res => {
        return res.data.result;
    }).catch(err => console.log(err));
}

export const createUser = (formData) => {
    axios({
        method: 'post',
        url: '/user',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        if (res.data.result) {
            alert('Welcome to my board :)');
            window.location.replace(res.data.url);
        } else {
            alert('The registration is failed. Please try again.');
        }
    }).catch(err => console.log(err));
}

export const updateUser = (formData) => {
    axios({
        method: 'put',
        url: '/user',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        if (res.data.result) {
            alert('User information update is completed.');
            window.location.replace(res.data.url);
        } else {
            alert('User information update is failed. Please try again.');
        }
    }).catch(err => console.log(err));
}

export const deleteUser = (formData) => {
    return axios({
        method: 'delete',
        url: '/user',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return res.data;
    }).catch(err => console.log(err));
}

export const tryLogIn = (formData) => {
    return axios({
        method: 'post',
        url: '/session/login',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return res.data;
    }).catch(err => console.log(err));
}

export const tryLogOut = () => {
    return axios.delete('/session/logout').then(res => {
        console.log(res.data);
        return res.data.result;
    }).catch(err => console.log(err));
}

export const getUserInfo = () => {
    return axios.get('/userinfo').then(res => {
        return res.data;
    }).catch(err => console.log(err));
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
    }).catch(err => console.log(err));
}

export const goAuthEmail = (formData) => {
    return axios({
        method: 'post',
        url: '/help/pwreset/authemail',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return res.data.result;
    }).catch(err => console.log(err));
}

export const issueNewPw = (id, token) => {
    return axios({
        method: 'post',
        url: '/help/pwreset/issue',
        data: {id: id, token: token}
    }).then(res => {
        return res.data;
    }).catch(err => console.log(err));
}