import mongoose from 'mongoose';
import autoIncrement from './autoIncrement';
import '../../modules/DateFormat';

const replySchema = new mongoose.Schema({
    id: { type: Number, unique: true, min: 1 },
    post_id: { type: Number, required: true, index: true },
    contents: { type: String, required: true, index: true },
    author: { type: String, required: true, index: true },
    author_id: { type: String, required: true, index: true },
    depth: { type: Number, default: 0 },
    parent_id: { type: Number, default: null },
    parent_nickname: { type: String, default: null },
    is_deleted: { type: Boolean, default: false },
    created_at: { type: String, default: new Date().format('yy-MM-dd HH:mm:ss') },
    updated_at: { type: String, default: new Date().format('yy-MM-dd HH:mm:ss') }
});

// id(주키, 댓글순번), post_id(외래키, 본글), contents, author(외래키, Users.nickname), 
// author_id(외래키, Users.id), parent_id(원댓,없으면null), is_deleted(댓글삭제여부 - '삭제된 댓글'로 표시), 
//  created_at(생성시각), updated_at(업데이트시각)

//contents, author -> 검색, post_id -> get, author_id -> 권한

replySchema.pre('save', async function (next) {
    if (!this.isNew) {
        next();
        return;
    }
    await autoIncrement(Reply, this, 'id'); // this는 save를 원하는 document, 'id'는 auto increase 대상 필드
    next();
});

const Reply = mongoose.model('Reply', replySchema);

export default Reply;

