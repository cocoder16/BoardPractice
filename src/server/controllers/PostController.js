import Post from '../models/post';
import '../../modules/DateFormat';

import MeasureRunTime from '../../modules/dev/MeasureRunTime';

class Converter {
    static CategoryStrToNum (str) {
        switch (str) {
            case 'qna' :
                return 0;
            case 'forum' :
                return 1;
        }
    }
    static mappingPostsTime (posts) {
        const today = new Date().format('yy-MM-dd');
        posts.map(cur => {
            if (cur.created_at.search(today) != -1) cur.created_at = cur.created_at.split(' ')[1].substr(0, 5);
            else cur.created_at = cur.created_at.split(' ')[0]
        });
    }
}

class Read {
    static async generalPosts (filter, skip, per, max) {
        return Post.find(filter)
        .select('id title author read_count reply_count created_at')
        .sort({id: -1}).skip(skip).limit(per*1).then(posts => {
            Converter.mappingPostsTime(posts);
            if (posts.length == 0 && skip != 0) return {result: false, url: '/'};
            return {result: true, max, posts};
        }).catch(err => console.log(err));
    }

    static async recentsPosts (filter) {
        return Post.find(filter)
        .select('id title author read_count reply_count created_at')
        .sort({id: -1}).limit(5).then(posts => {
            Converter.mappingPostsTime(posts);
            return posts
        });
    }
}

class PostController {
    static async createPost (formData, session) { 
        const category = Converter.CategoryStrToNum(formData.category);
        const newPost = new Post({
            category,
            title: formData.title,
            contents: formData.contents,
            author: session.usernickname,
            author_id: session.userid
        });
        console.log(newPost);
        return newPost.save().then(res => {
            console.log(res);
            return {result: true, url: `/article/${res.id}`};
        });
    }

    static async updatePost (formData, session) {
        return Post.updateOne({ id: formData.id, author_id: session.userid }, {$set: {
            title: formData.title, 
            contents: formData.contents, 
            updated_at: new Date().format('yy-MM-dd HH:mm:ss')
        }}, (err, rawResponse) => {
            console.log(rawResponse);
        }).then(res => {
            if (res.n == 0) return { result: false, url: '/' };
            else return { result: true, url: `/article/${formData.id}` };
        });
    }

    static async deletePost(id, category, session) {
        console.log('### del ###');
        console.log(id);
        console.log(session.userid);
        return Post.updateOne({id: id, author_id: session.userid}, {$set: {
            is_deleted: true, 
            updated_at: new Date().format('yy-MM-dd HH:mm:ss')
        }}, (err, rawResponse) => {
            console.log(rawResponse);
        }).then(res => {
            if (res.n == 1) return {result: true, url: `/${category}`};
            else return {result: false, url: '/'};            
        })
    }

    static async authModify (id, session) {
        return Post.find({id: id}).then(post => {
            if (post[0].author_id == session.userid) return true;
            else return false;
        })
    }

    static async getPosts (query) { //search에도 이걸로
        console.log("#### getPosts ####");
        
        const category = Converter.CategoryStrToNum(query.category);

        let filter = {category, is_deleted: false};
        
        //search인 경우에 필터내용추가
        if (query.type) {
            let tempFilter;
            switch (query.type) {
                case '0' :
                    tempFilter = { title: new RegExp(query.keyword) }; 
                    break;
                case '1' :
                    tempFilter = { $or: [ {title: new RegExp(query.keyword)}, {contents: new RegExp(query.keyword)} ] };
                    break;
                case '2' :
                    tempFilter = { author: new RegExp(query.keyword) };
                    break;
            }
            filter = {category, is_deleted: false, ...tempFilter}
        }
        
        const per = query.per*1;
        const skip = (query.page - 1) * per;

        console.log(skip);
        console.log(per);

        const total = await Post.countDocuments(filter).exec();
        console.log(total);
        const max = Math.ceil(total / per);
        
        return Read.generalPosts(filter, skip, per, max);
    }

    static async getArticle (num, session, newGet) {
        console.log('#### getArticle ####');
        console.log(newGet);
        if (newGet == 1) {
            await Post.updateOne({id: num}, {$inc: {
                read_count: 1
            }}).then(res => {
                console.log(res);
            });
        }
        return Post.find({id: num, is_deleted: false})
        .select('id category title contents author author_id read_count reply_count created_at').then(posts => {
            if (posts.length == 0) return {result: false, url: '/'};
            let auth = false;
            if (session.userid) {
                if (posts[0].author_id == session.userid) auth = true;
            }
            posts[0]._doc.auth = auth;
            console.log(posts[0]);
            return {result: true, article: posts[0]};
        });
    }

    static async recentPosts () {
        let qnaArr, forumArr;
        qnaArr = await Read.recentsPosts({category: 0, is_deleted: false});
        forumArr = await Read.recentsPosts({category: 1, is_deleted: false});
        return { qnaArr, forumArr }
    }
}

export default PostController;