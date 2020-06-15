import axios from 'axios';
import Exception from './Exception';

export const createPost = (formData) => {
    axios({
        method: 'post',
        url: '/post',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        window.location.replace(res.data.url);
    }).catch(err => {
        Exception.logAlertRedirect(err, 'failed to create post...');
    });
}

export const getPosts = (category, page, per) => {
    return axios({
        method: 'get',
        url: '/post',
        params: {
            category, page, per
        }
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const updatePost = (formData) => {
    axios({
        method: 'put',
        url: '/post',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        window.location.replace(res.data.url);
    }).catch(err => {
        Exception.logAlertRedirect(err, 'failed to update post...');
    });
}

export const deletePost = (id, category) => {
    axios({
        method: 'delete',
        url: '/post',
        params: {
            id, category
        }
    }).then(res => {
        window.location.replace(res.data.url);
    }).catch(err => {
        Exception.logAlertRedirect(err, 'failed to delete post...');
    });
}

export const getArticle = (num, newGet) => {
    console.log('newGet');
    console.log(newGet);
    return axios({
        method: 'get',
        url: `/post/${num}`,
        params: {
            newGet
        }
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const search = (category, type, keyword, page, per) => {
    return axios({
        method: 'get',
        url: '/search',
        params: {
            category, type, keyword, page, per
        }
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        Exception.basicRedirect();
    });
}

export const recentPosts = () => {
    return axios({
        method: 'get',
        url: '/recentposts',
    }).then(res => {
        return res.data;
    }).catch(err => console.log(err));
}