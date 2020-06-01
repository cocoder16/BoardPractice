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