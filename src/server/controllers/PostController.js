import Post from '../models/post';
import InputChecker from '../../modules/InputChecker';
import crypto from 'crypto';
import '../../modules/replaceAll';

import MeasureRunTime from '../../modules/dev/MeasureRunTime';

class UserController {
    static async createPost (formData, session) { 
        let category;
        switch (formData.category) {
            case 'qna' :
                category = 0; break;
            case 'forum' :
                category = 1; break;
        }
        const newPost = new Post({
            category: category,
            title: formData.title,
            contents: formData.contents,
            author: session.userid
        })
        console.log(newPost);
        newPost.save();
        return {result: true, url: '/'};
    }
}

export default UserController;