import Reply from '../models/reply';
import '../../modules/DateFormat';
import XSSFilter from '../../modules/XSSFilter';

import MeasureRunTime from '../../modules/dev/MeasureRunTime';

class ReplyController {
    static async createReply (formData, session) { 
        if (!session.userid) return {result: false, url: '/'};
        const contents = XSSFilter(formData.contents);
        const newReply = new Reply({
            post_id: formData.post_id,
            contents: contents,
            author: session.usernickname,
            author_id: session.userid,

        });
        console.log(newReply);
        return newReply.save().then(res => {
            console.log(res);
            return {result: true};
        });
    }
}

export default ReplyController;