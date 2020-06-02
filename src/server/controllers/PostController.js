import Post from '../models/post';

import MeasureRunTime from '../../modules/dev/MeasureRunTime';

class PostController {
    static async createPost (formData, session) { 
        let cate;
        switch (formData.category) {
            case 'qna' :
                cate = 0;
                break;
            case 'forum' :
                cate = 1;
                break;
        }
        const newPost = new Post({
            category: cate,
            title: formData.title,
            contents: formData.contents,
            author: session.userid
        })
        console.log(newPost);
        newPost.save();
        return {result: true, url: '/' + formData.category};
    }

    static async getPosts (category) {
        let cate;
        switch (category) {
            case 'qna' :
                cate = 0;
                break;
            case 'forum' :
                cate = 1;
                break;
        }
        return Post.find({category: cate, is_deleted: false})
        .select('id title author read_count reply_count created_at').sort({id: -1}).then(posts => {
            return posts;
        }).catch(err => console.log(err));
    }

    static async getArticle (num) {
        return Post.find({id: num, is_deleted: false})
        .select('category title contents author read_count reply_count created_at').then(post => {
            if (post.length == 0) return {result: false, url: '/'};
            else return {result: true, article: post[0]};
        })
    }
}

export default PostController;