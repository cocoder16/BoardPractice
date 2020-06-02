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
            
        }
    }).catch(err => console.log(err));
}

export const getPosts = (category) => {
    return axios({
        method: 'get',
        url: '/post',
        params: {
            category: category
        }
    }).then(res => {
        return res.data;
    }).catch(err => console.log(err));
}

export const getArticle = (num) => {
    return axios.get(`/post/${num}`).then(res => {
        return res.data;
    }).catch(err => console.log(err));
}