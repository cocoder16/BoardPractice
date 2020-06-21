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
            parent_id: formData.parent_id,
            parent_nickname: formData.parent_nickname //없으면 error안뜨고 알아서 default값 들어가.
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
        MeasureRunTime.start('getReplies');

        return Reply.find({ post_id })
        .select('id contents author author_id depth parent_id parent_nickname is_deleted created_at')
        .sort({ id: 1 }).then(replies => {
            if (replies.length == 0) {
                MeasureRunTime.end('getReplies');
                return { status: 200, data: []}
            }

            MeasureRunTime.start('Tree declaration');
            //트리 생성 함수
            const Tree = function (nodeValue) {
                this.value = nodeValue;
                this.children = [];
            }
            
            Tree.prototype.addChild = function (nodeValue) {
                this.children.push(new Tree(nodeValue));
            }

            Tree.prototype.preOrderFindByIdAddChild = function preOrderFindByIdAddChild(id, child, node=this) {
                if (!node) {
                    return;
                }
                
                if (node.value.id == id) {
                    node.addChild(child)
                    return;
                }
                for (let i = 0; i < node.children.length; i++) {
                    node.children[i].preOrderFindByIdAddChild(id, child);
                }
            }
            
            Tree.prototype.preOrderTraversalResort = function preOrderTraversalResort(arr, node=this) {
                if (!node) {
                    return;
                }
                
                arr.push(node.value);
                for (let i = 0; i < node.children.length; i++) {
                    node.children[i].preOrderTraversalResort(arr);
                }
            }
            MeasureRunTime.end('Tree declaration');

            MeasureRunTime.start('replyIdArr');
            const replyIdArr = replies.map(cur => {
                return cur.id;
            });
            MeasureRunTime.end('replyIdArr');

            MeasureRunTime.start('tree');
            const root = (function () {
                let maxDepth = -1;
                const tree = new Tree({id:-999}); //있을수 없는 임의의 id 루트는 depth 0을 묶기위한 가상트리
                for (let i = 0; i < replies.length; i++) {
                    if (replies[i].depth == 0) {
                        tree.addChild(replies[i]);
                        continue;
                    }
                    const targetId = (function() {
                        for (let j = 0; j < replyIdArr.length; j++) {
                            if (replyIdArr[j] == replies[i].parent_id) {
                                return replyIdArr[j];
                            }
                        }
                    })();
                    
                    console.log('####found targetId : ', targetId);
                    tree.preOrderFindByIdAddChild(targetId, replies[i]);
                }

                return tree;
            })();
            MeasureRunTime.end('tree');

            console.log('#### root ####');
            console.log(root);
                
            //원댓 순서대로 각 트리를 순회하면서 클라에 보낼 배열에 순서대로 담아준다.
            MeasureRunTime.start('preOrderTraversalResort');
            const orderedReplies = [];
            root.preOrderTraversalResort(orderedReplies);
            orderedReplies.shift(); //root는 원댓들을 묶는 가상 노드이므로 제거.
            MeasureRunTime.end('preOrderTraversalResort');

            console.log('#### orderedReplies ####');
            console.log(orderedReplies);

            const today = new Date().format('yy-MM-dd');

            MeasureRunTime.start('mapping');
            replies = orderedReplies.map(cur => {
                let auth = false;
                if (session.userid) {
                    if (cur.author_id == session.userid) auth = true;
                }
                cur._doc.auth = auth;
                if (cur.created_at.search(today) != -1) cur.created_at = cur.created_at.split(' ')[1].substr(0, 5);
                else cur.created_at = cur.created_at.split(' ')[0];
                return cur;
            });
            MeasureRunTime.end('mapping');
            MeasureRunTime.end('getReplies');
            return { status: 200, data: replies };
        }).catch(err => {
            return Exception._400(err, '#### catch : getReplies failed ####');
        });
    }
}

export default ReplyController;