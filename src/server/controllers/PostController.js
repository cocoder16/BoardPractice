import Post from '../models/post';
import '../../modules/DateFormat';
import Exception from './Exception';

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
            if (posts.length == 0 && skip != 0) return { status: 404 };
            return { status: 200, data: { max, posts }};
        }).catch(err => {
            return Exception._400(err, '#### catch : deletePost failed ####');
        });
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
        console.log('#### createPost ####');
        console.log('#### session');
        console.log(session);
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
            console.log('#### new Post ####');
            console.log(res);
            return { status: 201, data: { url: `/article/${res.id}` }};
        }).catch(err => {
            return Exception._400(err, '#### catch : createPost failed ####');
        });
    }

    static async updatePost (formData, session) {
        return Post.updateOne({ id: formData.id, author_id: session.userid }, { $set: {
            title: formData.title, 
            contents: formData.contents, 
            updated_at: new Date().format('yy-MM-dd HH:mm:ss')
        }}, (err, rawResponse) => {
            console.log(rawResponse);
        }).then(res => {
            if (res.n == 0) return { status: 401 };
            else return { status: 200, data: { url: `/article/${formData.id}` }};
        }).catch(err => {
            return Exception._400(err, '#### catch : updatePost failed ####');
        });
    }

    static async deletePost(id, category, session) {
        console.log('### del ###');
        console.log(id);
        console.log(session.userid);
        return Post.updateOne({ id, author_id: session.userid }, { $set: {
            is_deleted: true, 
            updated_at: new Date().format('yy-MM-dd HH:mm:ss')
        }}, (err, rawResponse) => {
            console.log(rawResponse);
        }).then(res => {
            if (res.n == 0) return { status: 401 };
            else return { status: 200 };            
        }).catch(err => {
            return Exception._400(err, '#### catch : deletePost failed ####');
        });
    }

    static async authModify (id, session) {
        return Post.find({ id }).then(post => {
            if (post[0].author_id == session.userid) return { status: 200 };
            else return { status: 404, data: { url: '/' }};
        }).catch(err => {
            return Exception._400URL(err, '#### catch : authModify failed ####', '/');
        })
    }

    static async getPosts (query) { //search에도 이걸로
        console.log("#### getPosts ####");
        
        const category = Converter.CategoryStrToNum(query.category);

        let filter = { category, is_deleted: false };
        
        //search인 경우에 필터내용추가
        if (query.type) {
            let tempFilter;
            switch (query.type) {
                case '0' :
                    tempFilter = { title: new RegExp(query.keyword) }; 
                    break;
                case '1' :
                    tempFilter = { $or: [{ title: new RegExp(query.keyword) }, { contents: new RegExp(query.keyword) }]};
                    break;
                case '2' :
                    tempFilter = { author: new RegExp(query.keyword) };
                    break;
            }
            filter = { ...filter, ...tempFilter }
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
            await Post.updateOne({ id: num }, {$inc: {
                read_count: 1
            }}).then(res => {
                console.log(res);
            }).catch(err => {
                return Exception._400(err, '#### catch : authModify failed ####');
            });
        }
        return Post.find({ id: num, is_deleted: false })
        .select('id category title contents author author_id read_count reply_count created_at').then(posts => {
            if (posts.length == 0) return { status: 404 };
            let auth = false;
            if (session.userid) {
                if (posts[0].author_id == session.userid) auth = true;
            }
            posts[0]._doc.auth = auth;
            console.log(posts[0]);
            return { status: 200, data: { article: posts[0] }};
        }).catch(err => {
            return Exception._400(err, '#### catch : authModify failed ####');
        });
    }

    static async recentPosts () {
        let qnaArr, forumArr;
        qnaArr = await Read.recentsPosts({ category: 0, is_deleted: false });
        forumArr = await Read.recentsPosts({ category: 1, is_deleted: false });
        return { qnaArr, forumArr }
    }
}

export default PostController;