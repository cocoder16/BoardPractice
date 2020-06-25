import axios from 'axios';
import Exception from './Exception';

export const createPost = async (formData) => {
    return axios({
        method: 'post',
        url: '/post',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return res.data.url;
    }).catch(err => {
        Exception.logAlertRedirect(err, 'failed to create post...');
    });
}

export const getPosts = async (category, page, per) => {
    return axios({
        method: 'get',
        url: '/post',
        params: {
            category, page, per
        },
        headers: { Pragma: 'no-cache' }
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const updatePost = async (formData) => {
    return axios({
        method: 'put',
        url: '/post',
        data: formData,
        headers: { 
            'content-type': 'multipart/form-data',
            Pragma: 'no-cache'
        }
    }).then(res => {
        return res.data.url;
    }).catch(err => {
        Exception.logAlertRedirect(err, 'failed to update post...');
    });
}

export const deletePost = async (id) => {
    return axios({
        method: 'delete',
        url: '/post',
        params: {
            id
        },
        headers: { Pragma: 'no-cache' }
    }).then(res => {
        return;
    }).catch(err => {
        Exception.logAlertRedirect(err, 'failed to delete post...');
    });
}

export const getArticle = async (num, newGet) => {
    return axios({
        method: 'get',
        url: `/post/${num}`,
        params: {
            newGet
        },
        headers: { Pragma: 'no-cache' }
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const search = async (category, type, keyword, page, per) => {
    return axios({
        method: 'get',
        url: '/search',
        params: {
            category, type, keyword, page, per
        },
        headers: { Pragma: 'no-cache' }
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const getRecentPosts = async () => {
    return axios({
        method: 'get',
        url: '/recentposts',
        headers: { Pragma: 'no-cache' }
    }).then(res => {
        return res.data;
    }).catch(err => console.log(err));
}