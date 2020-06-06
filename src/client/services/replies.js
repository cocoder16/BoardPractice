import axios from 'axios';

export const createReply = (formData) => {
    return axios({
        method: 'post',
        url: '/reply',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        console.log(res.data);
        return res.data.result;
    }).catch(err => console.log(err));
}

export const getReplies = (post_id) => {
    return axios({
        method: 'get',
        url: '/reply',
        params: {
            post_id: post_id
        }
    }).then(res => {
        return res.data;
    }).catch(err => console.log(err));
}

export const updateReply = (formData) => {
    return axios({
        method: 'put',
        url: '/reply',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return res.data.result;
    }).catch(err => console.log(err));
}

export const deleteReply = (id) => {
    return axios({
        method: 'delete',
        url: '/reply',
        params: { id }
    }).then(res => {
        return res.data.result;
    }).catch(err => console.log(err));
}