import axios from 'axios';
import Exception from './Exception';

export const createReply = (formData) => {
    return axios({
        method: 'post',
        url: '/reply',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return true;
    }).catch(err => {
        Exception.logAlertRedirect(err, 'registering reply is failed.');
    });
}

export const getReplies = (post_id) => {
    return axios({
        method: 'get',
        url: '/reply',
        params: {
            post_id
        }
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const updateReply = (formData) => {
    return axios({
        method: 'put',
        url: '/reply',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return true;
    }).catch(err => {
        Exception.logAlertRedirect(err, 'modifying reply is failed.');
    });
}

export const deleteReply = (id) => {
    return axios({
        method: 'delete',
        url: '/reply',
        params: { 
            id 
        }
    }).then(res => {
        return true
    }).catch(err => {
        Exception.logAlertRedirect(err, 'deleting reply is failed.');
    });
}