import axios from 'axios';

export const createReply = (formData) => {
    axios({
        method: 'post',
        url: '/reply',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        return (res.data);
    }).catch(err => console.log(err));
}