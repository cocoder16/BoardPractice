import User from '../models/user';
import InputChecker from '../../modules/InputChecker';
import crypto from 'crypto';

import MeasureRunTime from '../../modules/dev/MeasureRunTime';
import { raw } from 'express';

class UserController {
    static async checkOverlap (target) { //하나만 찾고 멈추는 쿼리를..
        const user = await User.find(target).limit(1).then(user => {
            return user;
        });
        console.log(user);
        console.log('user length: ', user.length);
        if (user.length > 0) return {result: true};
        else return {result: false};
    }

    static async testFormAndCreateUser (formData) {
        //form vaildation test
        if(!InputChecker.id(formData.id) || !InputChecker.pw(formData.pw) || formData.pw !== formData.pwConfirm
        || !InputChecker.nickname(formData.nickname) || !InputChecker.email(formData.email)) {
            const isOverlap_id = await this.checkOverlap({id: formData.id});
            console.log(isOverlap_id);
            if (isOverlap_id.result === true) return {result: false};
            const isOverlap_nickname = await this.checkOverlap({nickname: formData.nickname});
            if (isOverlap_nickname.result === true) return {result: false};
            //if pass... password encryption
            crypto.randomBytes(64, (err, buf) => {
                crypto.pbkdf2(formData.pw, buf.toString('base64'), process.env.ITERATIONS*1, 64, 'sha512', (err, key) => {
                    //save
                    const newUser = new User({
                        id: formData.id,
                        password: key.toString('base64'), //formData.pw을 salt와 함께 암호화한 것이 key파라미터로 전달. buffer형태이므로 string으로.
                        salt: buf.toString('base64'),
                        nickname: formData.nickname,
                        email: formData.email
                    })
                    console.log(newUser);
                    newUser.save();
                });
            });
            //result true
            return {result: true, url: '/'};
        } else return {result: false};
    }

    static async logInDataCheck (req, formData) {
        let proc = {};
        // 아이디가 있는지 찾고 있으면 입력받은 pw를 해시화하여 DB에 있는 값과 비교
        MeasureRunTime.start('find');
        return await User.find({id: formData.id, is_deleted: false}).then(user => {
            MeasureRunTime.end('find');
            if (user.length > 0) {
                const salt = user[0].salt;
                MeasureRunTime.start('pw hash');
                const key = crypto.pbkdf2Sync(formData.pw, salt, process.env.ITERATIONS*1, 64, 'sha512');
                MeasureRunTime.end('pw hash');
                if (key.toString('base64') === user[0].password) {
                    proc.result = 'success';
                    proc.userInfo = {id: user[0].id, nickname: user[0].nickname, email: user[0].email}
                     //session 만들어주고,
                    req.session.userid = formData.id;
                    req.session.save();
                    MeasureRunTime.start('findOneAndUpdate');
                    User.updateOne({id: formData.id, is_deleted: false}, {$set: {is_login: true}}, (err, rawResponse) => {
                        if (err) console.log(err);
                        else {
                            console.log(rawResponse);
                        }
                    })
                    MeasureRunTime.end('findOneAndUpdate');
                    return {...proc, result: true}
                } else return {result: false}
            }
        });
    }

    static logOut (req) {
        return User.updateOne({id: req.session.userid, is_deleted: false},
            {$set: {is_login: false, last_logout: Date.now() + 3600000 * 9}}, (err, rawResponse) => {
                if (err) console.log(err);
                else {
                    console.log(rawResponse);
                    req.session.destroy();
                }
            }
        ).then(res => {
            console.log(res);
            if (res.n == 1) return {result: true}
            else return {result: false}
        })
    }

    static getUserInfo (req) {
        console.log(req.session);
        console.log(req.session.userid);
        //유저데이터는 세션을 통해 검증받아야만 보냄.
        if (!req.session.userid) return {result: false, userInfo: {id: '', nickname: '', email: ''}}
        //세션이 있다면 그에 맞는 유저 데이터를 보냄.
        return User.find({id: req.session.userid, is_deleted: false}).then(user => {
            if (user.length == 0) {
                return {result: false, userInfo: {id: '', nickname: '', email: ''}}
            } else {
                return {result: true, userInfo: {id: user[0].id, nickname: user[0].nickname, email: user[0].email}}
            }
        }).catch(err => console.log(err));
    }
}

module.exports = UserController;