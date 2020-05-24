import User from '../models/user';
import InputChecker from '../../modules/InputChecker';
import crypto from 'crypto';

class UserController {
    static async checkOverlap (target) { //하나만 찾고 멈추는 쿼리를..
        const user = await User.find(target).limit(1).then(user => {
            return user;
        });
        console.log(user);
        console.log('user length: ' ,user.length);
        if (user.length > 0) return {result: true};
        else return {result: false};
    }

    static async testFormAndCreateUser (formData) {
        console.log('controller');
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
                crypto.pbkdf2(formData.pw, buf.toString('base64'), 1108943, 64, 'sha512', (err, key) => {
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
                    console.log('end');
                });
            });
            //result true
            return {result: true, url: '/'};
        } else {
            return {result: false};
        }
    }
}

module.exports = UserController;