const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  id: { type: String, lowercase: true, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true, index = true },
  email: { type: String },
  auth: { type: Number, default: 2 },
  is_login: { type: Boolean },
  last_logout: { type: Date },
  created_at: { type: Date },
  updated_at: { type: Date },
  deleted_at: { type: Date }
});
// id(주키), pw(암호화), nickname, email, auth(관리자0,스태프1,일반2), is_login(로그인상태), 
// last_logout(마지막로그아웃시각), created_at(생성시각), updated_at(업데이트시각), 
// deleted_at(삭제시각)

//index는 쿼리 자주 하는거
//id, password,->로그인때메->세션쓰면되려나?, nickname -> 검색

// userSchema.statics.findTarget = function () {
//   // return promise
//   // V4부터 exec() 필요없음
//   return this.find({}).sort({date: -1}).limit(1);
// };

const User = mongoose.model('User', userSchema); //User model 생성하고 exports
module.exports = User;