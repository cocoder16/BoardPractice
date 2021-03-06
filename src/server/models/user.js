import mongoose from 'mongoose';
import autoIncrement from './autoIncrement';

const userSchema = new mongoose.Schema({
    id: { type: Number, unique: true, min: 1, index: true },
    user_id: { type: String, required: true, lowercase: true, index: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    nickname: { type: String, required: true, index: true },
    email: { type: String, required: true },
    is_login: { type: Boolean, default: false },
    last_logout: { type: Date, default: Date.now() + 3600000 * 9 },
    is_deleted: { type: Boolean, default: false },
    email_token: { type: String, default: '' }
}, {
    timestamps: { currentTime: () => Date.now() + 3600000 * 9 } //ISO date에 한국시각을 덮어써서 created_at, updated_at 자동저장
});
// id(주키, 순번), user_id(유저아이디), pw(암호화), nickname, email, auth(관리자0,스태프1,일반2), is_login(로그인상태), 
// last_logout(마지막로그아웃시각), is_deleted(계정삭제여부), created_at(생성시각), updated_at(업데이트시각), 
// deleted_at(삭제시각)은 없고 is_deleted와 updated_at으로 대신함.

//index는 쿼리 자주 하는거
//user_id, password,->로그인, user_id의 경우 회원가입때는 중복체크, id, nickname -> 검색

userSchema.pre('save', async function (next) {
    if (!this.isNew) {
        next();
        return;
    }
    await autoIncrement(User, this, 'id'); // this는 save를 원하는 document, 'id'는 auto increase 대상 필드
    next();
});

const User = mongoose.model('User', userSchema); //User model 생성하고 exports

export default User;