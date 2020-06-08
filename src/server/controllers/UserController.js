import User from '../models/user';
import InputChecker from '../../modules/InputChecker';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import '../../modules/replaceAll';
import Post from '../models/post';
import Reply from '../models/reply';

import MeasureRunTime from '../../modules/dev/MeasureRunTime';

class UserController {
    static async checkOverlap (target) { //하나만 찾고 멈추는 쿼리를..
        const user = await User.find({...target, is_deleted: false}).limit(1).then(user => {
            return user;
        });
        if (user.length > 0) return {result: true};
        else return {result: false};
    }

    static async testFormAndCreateUser (formData) {
        //form vaildation test
        if(InputChecker.id(formData.id) && InputChecker.pw(formData.pw) && InputChecker.nickname(formData.nickname) 
        && InputChecker.email(formData.email)) {
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

    static async testFormAndUpdateUser (formData) {
        return User.find({id: formData.id, is_deleted: false}).then(user => {
            //pw 검사 및 재설정
            if (formData.pw != '') {
                if (!InputChecker.pw(formData.pw)) return {result: false};
                else {
                    //pw포함 재설정
                    crypto.randomBytes(64, (err, buf) => {
                        crypto.pbkdf2(formData.pw, buf.toString('base64'), process.env.ITERATIONS*1, 64, 'sha512', (err, key) => {
                            User.updateOne({id: formData.id, is_deleted: false}, {$set: {
                                password: key.toString('base64'), 
                                salt: buf.toString('base64'),
                                nickname: formData.nickname,
                                email: formData.email
                            }}, (err, raw) => {
                                console.log(raw);
                            });
                        });
                    });
                    return {result: true, url: '/'};
                }
            }
            //nickname 검사 및 재설정
            if (formData.nickname != user[0].nickname) {
                console.log('## go to nickname check ##');
                if (!InputChecker.nickname(formData.nickname)) return {result: false};
            }
            console.log('## pass nick check ##');
            //pw빼고 재설정
            if (!InputChecker.email(formData.email)) return {result: false};
            User.updateOne({id: formData.id, is_deleted: false}, {$set: {
                nickname: formData.nickname,
                email: formData.email
            }}, (err, raw) => {
                console.log(raw);
            });
            return {result: true, url: '/'}
        })
    }

    static async deleteUser (formData, session) {
        return await User.find({id: session.userid, is_deleted: false}).then(user => {
            if (user.length > 0) {
                const salt = user[0].salt;
                const key = crypto.pbkdf2Sync(formData.pw, salt, process.env.ITERATIONS*1, 64, 'sha512');
                if (key.toString('base64') === user[0].password) {
                    User.updateOne({id: session.userid, is_deleted: false}, 
                        {$set: {is_login: false, is_deleted: true}}, (err, raw) => {
                            if (err) console.log(err);
                            else {
                                session.destroy();
                                console.log(raw);
                            }
                        })
                    return {result: true}
                } else return {result: false}
            }
        });
    }

    static async logInDataCheck (req, formData) {
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
                     //session 만들어주고,
                    req.session.userid = formData.id;
                    req.session.usernickname = user[0].nickname;
                    req.session.save();
                    MeasureRunTime.start('findOneAndUpdate');
                    User.updateOne({id: formData.id, is_deleted: false}, {$set: {is_login: true}}, (err, rawResponse) => {
                        if (err) console.log(err);
                        else {
                            console.log(rawResponse);
                        }
                    })
                    MeasureRunTime.end('findOneAndUpdate');
                    return {result: true}
                } else return {result: false}
            }
        });
    }

    static async logOut (req) {
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

    static async getUserInfo (req) {
        console.log('#### getUserInfo ####');
        //유저데이터는 세션을 통해 검증받아야만 보냄.
        if (!req.session.userid) return {result: false, userInfo: {id: '', nickname: '', email: ''}}
        //세션이 있다면 그에 맞는 유저 데이터를 보냄.
        return User.find({id: req.session.userid, is_deleted: false}).then(async user => {
            if (user.length == 0) {
                return {result: false, userInfo: {id: '', nickname: '', email: ''}};
            } else {
                return {result: true, userInfo: {id: user[0].id, nickname: user[0].nickname,
                    email: user[0].email}};
            }
        }).catch(err => console.log(err));
    }

    static async getUserWrote (req) {
        if (!req.session.userid) return {result: false, url: '/'};
        const query = req.query;
        const per = query.per*1;
        const skip = (query.page - 1) * per;
        const today = new Date().format('yy-MM-dd');

        if (query.type == 'posts') {
            const total = await Post.countDocuments({author_id: req.session.userid, is_deleted: false}).exec();
            const max = Math.ceil(total / per);
            const postArr = await Post.find({author_id: req.session.userid, is_deleted: false})
                .select('id title category read_count reply_count created_at')
                .sort({id: -1}).skip(skip).limit(per*1).then(postArr => {
                    postArr.map(cur => {
                        if (cur.created_at.search(today) != -1) cur.created_at = cur.created_at.split(' ')[1].substr(0, 5);
                        else cur.created_at = cur.created_at.split(' ')[0];
                    });
                    return postArr;
                });
            return {result: true, max, postArr, replyArr: []}
        } else if (query.type == 'replies') {
            const total = await Reply.countDocuments({author_id: req.session.userid, is_deleted: false}).exec();
            const max = Math.ceil(total / per);
            const replyArr = await Reply.find({author_id: req.session.userid, is_deleted: false})
                .select('id post_id contents created_at')
                .sort({id: -1}).skip(skip).limit(per*1).then(replyArr => {
                    replyArr.map(cur => {
                        if (cur.created_at.search(today) != -1) cur.created_at = cur.created_at.split(' ')[1].substr(0, 5);
                        else cur.created_at = cur.created_at.split(' ')[0];
                    });
                    return replyArr;
                });
            return {result: true, max, postArr: [], replyArr};
        }
    }

    static async sendPwAuthEmail (id) {
        console.log(id);
        return User.find({id: id, is_deleted: false}).then(user => {
            if (user.length == 0) return {result: false}

            const userEmail = user[0].email;

            //token발급과 함께 인증메일 발송
            crypto.randomBytes(64, (err, buf) => {
                crypto.pbkdf2(userEmail, buf.toString('base64'), process.env.ITERATIONS*1, 64, 'sha512', (err, key) => {
                    let emailToken = key.toString('base64');
                    emailToken = emailToken.replaceAll('+', '-'); //url safe base64
                    emailToken = emailToken.replaceAll('/', '_');
                    User.updateOne({id: id, is_deleted: false},
                    {$set: {email_token: emailToken}}, (err, rawResponse) => {
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: process.env.MAIL,
                                pass: process.env.MAIL_PASS
                            }
                        });
                        const mailOptions = {
                            from: process.env.MAIL,
                            to: userEmail,
                            subject: 'Board Practice 비밀번호 재설정 인증메일 입니다.',
                            html: `<p>회원 인증을 위해서 
                                <a href='${process.env.DEV_DOMAIN}/auth/?id=${user[0].id}&token=${emailToken}'>
                                인증하기</a>를 클릭해주세요</p>`
                        };
                        transporter.sendMail(mailOptions, (err, info) => {
                            if (err) console.log(err);
                            else console.log('Email sent: ' + info.response);
                        })
                    });
                });
            });
            
            return {result: true}
        })
    }
    
    static async issueNewPw (id, token) {
        let newPw = '';
        for (let i = 0; i < 12; i++) {
            if (i < 4) newPw += String.fromCharCode((Math.random() * 26) + 97); //a-z
            else if (i < 8) newPw += String.fromCharCode((Math.random() * 10) + 48); //0-9
            else newPw += String.fromCharCode((Math.random() * 15) + 33); //특수문자
        } 
        console.log('#### new pw : ' + newPw);
        const buffer = await new Promise((res, rej) => {
            crypto.randomBytes(64, function(err, buf) {
                if (err) rej("cant generate buffer.");
                res(buf);
            });
        });
        const buf = buffer.toString('base64');
        const key = crypto.pbkdf2Sync(newPw, buf, process.env.ITERATIONS*1, 64, 'sha512');
        const newPwHash = key.toString('base64');
        //
        const resData = await new Promise((res, rej) => {
            User.updateOne({id: id, email_token: token, is_deleted: false},
            {$set: {salt: buf, password: newPwHash, email_token: ''}}, (err, rawResponse) => {
                console.log(rawResponse);
                if (rawResponse.n == 0) res({result: false, pw: ''});
                else res({result: true, pw: newPw});
            })
        });
        return resData;
        // why not same rawResponse and res
        // return User.updateOne({id: id, email_token: token, is_deleted: false},
        // {$set: {salt: buf, password: newPwHash, email_token: ''}}, (err, rawResponse) => {
        //     console.log(rawResponse);
        // }).then(res => {
        //     console.log(res);
        //     if (res.n == 0) return {result: false};
        //     else return {result: true, pw: newPw};
        // });
    }
}

export default UserController;