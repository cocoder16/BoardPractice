import axios from 'axios';

export const createPost = (formData) => {
    axios({
        method: 'post',
        url: '/post',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        if (res.data.result) {
            window.location.replace(res.data.url);
        } else {
            window.location.replace(res.data.url);
            console.log('!!!!!!! failed createPost !!!!!!!');
        }
    }).catch(err => console.log(err));
}

export const getPosts = (category, page, per) => {
    return axios({
        method: 'get',
        url: '/post',
        params: {
            category: category,
            page: page,
            per: per
        }
    }).then(res => {
        return res.data;
    }).catch(err => console.log(err));
}

export const updatePost = (formData) => {
    axios({
        method: 'put',
        url: '/post',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        if (res.data.result) {
            window.location.replace(res.data.url);
        } else {
            window.location.replace(res.data.url);
            console.log('!!!!!!! failed updatePost !!!!!!!');
        }
    }).catch(err => console.log(err));
}

export const deletePost = (id, category) => {
    axios({
        method: 'delete',
        url: '/post',
        params: {
            id: id,
            category: category
        }
    }).then(res => {
        if (res.data.result) {
            window.location.replace(res.data.url);
        } else {
            window.location.replace(res.data.url);
            console.log('!!!!!! failed deletePost !!!!!!!');
        }
    }).catch(err => console.log(err));
}

export const getArticle = (num) => {
    return axios.get(`/post/${num}`).then(res => {
        return res.data;
    }).catch(err => console.log(err));
}