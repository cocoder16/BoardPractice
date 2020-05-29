import mongoose from 'mongoose';
import autoIncrement from './autoIncrement';

const postSchema = new mongoose.Schema({
    _id: { type: Number },
    title: { type: String, required: true, index: true },
    contents: { type: String, required: true, index: true },
    author: { type: String, required: true, index: true },
    category: { type: Number, required: true },
    is_deleted: { type: Boolean, default: false },
    read_count: { type: Number, default: 0 },
    attach_sequence: { type: Number, default: null }
}, {
    timestamps: { currentTime: () => Date.now() + 3600000 * 9 }
});

// _id(주키, 게시글순번), title, contents, author(외래키, Users.id), category(qna 0, forum 1),
//  is_deleted(글삭제여부), read_count(조회수), createdAt(생성시각), updatedAt(업데이트시각), 
// attach_sequence(첨부파일 순번)

//title, contents, author -> 검색,

Post.pre('save', function (next) {
    autoIncrement(Post, this, column, next);
    // Arguments:
    // model: The model const here below
    // this: The schema, the body of the document you wan to save
    // column: auto-increment that want to apply
    // next: next fn to continue
});

const Post = mongoose.model('Post', postSchema);

export default Post;