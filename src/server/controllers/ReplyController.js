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

    static async getReplies (post_id) {
        return Reply.find({post_id, is_deleted: false})
        .select('id contents author parent_id created_at')
        .sort({id: 1}).then(replies => {
            const today = new Date().format('yy-MM-dd');
            console.log(today);
            replies.map(cur => {
                if (cur.created_at.search(today) != -1) cur.created_at = cur.created_at.split(' ')[1].substr(0, 5);
                else cur.created_at = cur.created_at.split(' ')[0]
            });
            return replies;
        }).catch(err => console.log(err));
    }
}

export default ReplyController;