import Post from '../models/post';
import '../../modules/DateFormat';

import MeasureRunTime from '../../modules/dev/MeasureRunTime';

class PostController {
    static async createPost (formData, session) { 
        if (!session.userid) return {result: false, url: '/'};
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
            author: session.usernickname,
            authorId: session.userid
        });
        console.log(newPost);
        newPost.save().then(res => {
            console.log(res);
        });
        return {result: true, url: '/' + formData.category};
    }

    static async updatePost (formData, session) {
        return Post.updateOne({id: formData.id, authorId: session.userid, is_deleted: false},
        {$set: {title: formData.title, contents: formData.contents, 
        updated_at: new Date().format('yy-MM-dd a/p hh:mm:ss')}}, (err, rawResponse) => {
            console.log(rawResponse);
        }).then(res => {
            if (res.n == 0) return {result: false, url: '/'};
            else return {result: true, url: `/article/${formData.id}`};
        })
    }

    static async authoModify (id, session) {
        return Post.find({id: id}).then(post => {
            if (post[0].authorId == session.userid) return true;
            else return false;
        })
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
        .select('id category title contents author authorId read_count reply_count created_at').then(post => {
            if (post.length == 0) return {result: false, url: '/'};
            else return {result: true, article: post[0]};
        })
    }
}

export default PostController;