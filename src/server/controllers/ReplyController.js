import Reply from '../models/reply';
import Post from '../models/post';
import '../../modules/DateFormat';
import XSS from '../../modules/XSS';
import Exception from './Exception';

import MeasureRunTime from '../../modules/dev/MeasureRunTime';

class ReplyController {
    static async createReply (formData, session) { 
        // -- 검사
        if (!session.userid) return { status: 401 }
        const contents = XSS.Filter(formData.contents);
        // -- 통과
        await Post.updateOne({ id: formData.post_id }, { $inc: {
            reply_count: 1
        }}).then(res => {
            console.log(res);
        });
        const newReply = new Reply({
            post_id: formData.post_id,
            contents,
            author: session.usernickname,
            author_id: session.userid,
            depth: formData.depth,
            parent_id: formData.parent_id
        });
        console.log(newReply);
        return newReply.save().then(res => {
            console.log(res);
            return { status: 201 };
        }).catch(err => {
            return Exception._400(err, '#### catch : createReply failed ####');
        });
    }

    static async updateReply (formData, session) {
        if (!session.userid) return { status: 401 };
        console.log('#### update Reply ####');
        console.log(formData);
        console.log(session);
        return Reply.updateOne({ id: formData.id, author_id: session.userid }, { $set: {
            contents: formData.contents, 
            updated_at: new Date().format('yy-MM-dd HH:mm:ss')
        }}, (err, rawResponse) => {
            console.log(rawResponse);
        }).then(res => {
            if (res.n == 0) return { status: 401 };
            else return { status: 200 };
        }).catch(err => {
            return Exception._400(err, '#### catch : updateReply failed ####');
        });
    }

    static async deleteReply (query, session) {
        const { id, post_id } = query;
        console.log(id, post_id);
        Post.updateOne({id: post_id}, { $inc: {
            reply_count: -1
        }}, (err, raw) => {
            console.log(raw);
        })
        if (!session.userid) return { status: 401 };
        return Reply.updateOne({ id, author_id: session.userid }, { $set: {
            is_deleted: true,
            updated_at: new Date().format('yy-MM-dd HH:mm:ss')
        }}, (err, rawResponse) => {
            console.log(rawResponse);
        }).then(res => {
            if (res.n == 0) return { status: 400 };
            else return { status: 200 };
        }).catch(err => {
            return Exception._400(err, '#### catch : deleteReply failed ####');
        });
    }

    static async getReplies (post_id, session) {
        console.log('#### getReplies ####');
        //lowArr, highArr 를 만드는 함수
        const sameDepthArrGenerator = (arr, _depth) => {
            const newArr = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].depth == _depth) newArr.push(arr[i]);
            }
            return newArr;
        }
        //resort()를 보조하는 함수
        const searchParent = (arr, parentId) => { //arr가 탐색대상 highArr
            let newArr = [];
            for (let i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                    if (arr[i][0].parent_id == parentId) {
                        newArr = [ ...newArr, ...arr[i] ];
                    }
                } else {
                    if (arr[i].parent_id == parentId) {
                        newArr = [ ...newArr, arr[i] ];
                    }
                }
            }
            // console.log('#### searchParent ####');
            // console.log(newArr);
            return newArr;
        };
        //댓글 depth고려해 재정렬 하기 위한 함수
        const resort = (lowArr, highArr) => { //depth값이 lowArr + 1 = highArr
            const newArr = [];
            for (let i = 0; i < lowArr.length; i++) {
                // console.log('#### resort ####');
                const newEle = searchParent(highArr, lowArr[i].id);
                // console.log(`#### new Ele - ${i}####`);
                // console.log(newEle);
                newEle.unshift( lowArr[i]);
                // console.log('#### unshift ####');
                // console.log(newEle);
                newArr.push(newEle);
            }
            return newArr;
        };

        const maxDepth = await Reply.find({ post_id }).sort({ depth: -1 }).limit(1).then(replies => {
            if (replies.length == 0) return -1;
            return replies[0].depth;
        }).catch(err => {
            return Exception._400(err, '#### catch : getReply failed ####');
        });
        // console.log('#### max Depth ####');
        // console.log(maxDepth);
        if (maxDepth == { status: 404 }) return { status: 404 };

        console.log('#### post_id ####');
        console.log(post_id);
        return Reply.find({ post_id })
        .select('id contents author author_id depth parent_id is_deleted created_at')
        .sort({ id: 1 }).then(replies => {
            console.log('#### replies ####');
            console.log(replies);
            const today = new Date().format('yy-MM-dd');
            //id낮은 순으로 정렬되어있는상태.
            //depth의 max값을 구하고, 그 값에 해당하는 document들만 새 배열에 정렬함.
            //한단계 위의 depth에 해당하는 document들만 다른 새 배열에 정렬함.
            //max depth에 해당하는 document들의 parent_id에 해당하는 document를 찾아서 걔아래로 id낮은순으로 들어감.
            //윗줄의 결과 예시 [[5, 6, 6, 6], [5], [5], [5, 6]] 원소값은 depth를 나타냄
            //얘네를 원소 순서대로 다시 depth가 4인 document 배열에 들어감.
            //[[4], [4, 5, 6, 6, 6], [4], [4, 5, 5], [4], [4], [4, 5, 6]] 이런식으로 반복
            //최종적으로 [[1], [2], [3]] 이런꼴이 됨. mapping 할때 배열 풀어줌.
            if (replies.length > 0 && maxDepth > 0) {
                const highArr = sameDepthArrGenerator(replies, maxDepth);

                const finalResort = (function resortMerger (depth, highArr) {
                    // console.log('#### highArr ####');
                    // console.log(highArr);
                    const lowArr = sameDepthArrGenerator(replies, depth - 1);
                    // console.log('#### lowArr ####');
                    // console.log(lowArr);

                    if (depth == 1) return resort(lowArr, highArr);
                    return resortMerger (depth-1, resort(lowArr, highArr));
                })(maxDepth, highArr);
                // console.log('#### finalResort ####');
                // console.log(finalResort);

                // console.log('#### finalResort resolve ####');
                replies = finalResort.reduce((acc, cur) => {
                    return [ ...acc, ...cur ];
                });

                replies = replies.map(cur => {
                    let auth = false;
                    if (session.userid) {
                        if (cur.author_id == session.userid) auth = true;
                    }
                    cur._doc.auth = auth;
                    // console.log(cur);
                    if (cur.created_at.search(today) != -1) cur.created_at = cur.created_at.split(' ')[1].substr(0, 5);
                    else cur.created_at = cur.created_at.split(' ')[0];
                    return cur;
                });
                // console.log('#### replies ####');
                // console.log(replies);
            } else if (replies.length > 0 && maxDepth == 0) {
                replies.map(cur => {
                    let auth = false;
                    if (session.userid) {
                        if (cur.author_id == session.userid) auth = true;
                    }
                    cur._doc.auth = auth;
                    if (cur.created_at.search(today) != -1) cur.created_at = cur.created_at.split(' ')[1].substr(0, 5);
                    else cur.created_at = cur.created_at.split(' ')[0]
                });
            }
            return { status: 200, data: replies };
        }).catch(err => {
            return Exception._400(err, '#### catch : getReplies failed ####');
        });
    }
}

export default ReplyController;