import axios from 'axios';
import Exception from './Exception';

export const createReply = async (formData) => {
    return axios({
        method: 'post',
        url: '/reply',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return;
    }).catch(err => {
        Exception.logAlertRedirect(err, 'registering reply is failed.');
    });
}

export const getReplies = async (post_id) => {
    return axios({
        method: 'get',
        url: '/reply',
        params: {
            post_id
        },
        headers: { Pragma: 'no-cache' }
    }).then(res => {
        return res.data;
    }).catch(err => {
        Exception.basicRedirect(err);
    });
}

export const updateReply = async (formData) => {
    return axios({
        method: 'put',
        url: '/reply',
        data: formData,
        headers: { 
            'content-type': 'multipart/form-data',
            Pragma: 'no-cache'
        }
    }).then(res => {
        return;
    }).catch(err => {
        Exception.logAlertRedirect(err, 'modifying reply is failed.');
    });
}

export const deleteReply = async (id, post_id) => {
    return axios({
        method: 'delete',
        url: '/reply',
        params: { 
            id, post_id
        },
        headers: { Pragma: 'no-cache' }
    }).then(res => {
        return;
    }).catch(err => {
        Exception.logAlertRedirect(err, 'deleting reply is failed.');
    });
}