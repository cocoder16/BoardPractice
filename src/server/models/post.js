import mongoose from 'mongoose';
import autoIncrement from './autoIncrement';
import '../../modules/DateFormat';

const postSchema = new mongoose.Schema({
    id: { type: Number, unique: true, min: 1, index: true },
    title: { type: String, required: true, index: true },
    contents: { type: String, required: true, index: true },
    author: { type: String, required: true, index: true },
    author_id: { type: String, required: true, index: true },
    category: { type: Number, required: true },
    is_deleted: { type: Boolean, default: false },
    read_count: { type: Number, default: -1 },
    reply_count: { type: Number, default: 0 },
    created_at: { type: String, default: new Date().format('yy-MM-dd HH:mm:ss') },
    updated_at: { type: String, default: new Date().format('yy-MM-dd HH:mm:ss') }
});

// id(주키, 게시글순번), title, contents, author(외래키, Users.id), category(qna 0, forum 1),
//  is_deleted(글삭제여부), read_count(조회수), reply_count(댓글수), 
// created_at(생성시각), updated_at(업데이트시각),

//title, contents, author -> 검색, id -> get url, authorId -> 권한

postSchema.pre('save', async function (next) {
    if (!this.isNew) {
        next();
        return;
    }
    await autoIncrement(Post, this, 'id'); // this는 save를 원하는 document, 'id'는 auto increase 대상 필드
    next();
});

const Post = mongoose.model('Post', postSchema);

export default Post;