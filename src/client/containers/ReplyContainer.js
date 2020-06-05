import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ReplyForm, ReplyList } from '~c/components';
import * as replyActions from '~c/store/reply';
import { createReply, updateReply } from '~c/services/replies';

class ReplyContainer extends Component {
    constructor (props) {
        super(props);
        this.props.getReplies(location.pathname.split('/article/')[1]);
    }

    handleTextChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
        this.props.textChange(value);
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const { contents, replyForm, unshown } = this.props;

        const formData = new FormData();
        formData.append('contents', contents);

        let result
        if (unshown == 0) {
            formData.append('post_id', location.pathname.split('/article/')[1]);
            formData.append('depth', replyForm.depth);
            formData.append('parent_id', replyForm.id);
            result = await createReply(formData);
        } else {
            formData.append('id', replyForm.id);
            result = await updateReply(formData);
        }
        console.log(result);
        if (result) {
            document.querySelector('.reply-form .contents').value = '';
            this.props.clear();
            this.props.getReplies(location.pathname.split('/article/')[1]);
        } else {
            alert('댓글 등록에 실패했습니다.');
        }
    }

    loadReplyForm = (e) => {
        e.preventDefault();
        if (!this.props.isLoggedIn) return null;
        const depth = e.target.parentNode.getAttribute('data-depth');
        console.log(depth);
        let prevEle = e.target.parentNode;
        let nextEle;
        if (e.target.parentNode.nextSibling) {
            nextEle = e.target.parentNode.nextSibling;
            while (nextEle.getAttribute('data-depth') > depth) {
                console.log('aa');
                console.log(prevEle);
                console.log(nextEle);
                prevEle = nextEle;
                nextEle = nextEle.nextSibling;
            }
        }
        console.log(prevEle);
        this.props.loadReplyForm(prevEle.getAttribute('data-id'), e.target.parentNode.getAttribute('data-id'), depth*1 + 1);
    }

    onModifyMode = (e) => {
        e.preventDefault();
        const reply = e.target.parentNode.parentNode;
        const id = reply.getAttribute('data-id');
        const depth = reply.getAttribute('data-depth');
        this.props.displayOff(id);
        this.props.loadReplyForm(id, id, depth*1 + 1);
    }

    render() {
        const { handleTextChange, handleFormSubmit, loadReplyForm, onModifyMode } = this;
        const { replies, isLoggedIn, replyForm, unshown,
            clear } = this.props;

        return (
            <Fragment>
                <ReplyList 
                    replies={replies} 
                    loadReplyForm={loadReplyForm} 
                    replyForm={replyForm}
                    handleTextChange={handleTextChange} 
                    handleFormSubmit={handleFormSubmit}
                    clear={clear}
                    onModifyMode={onModifyMode}
                    unshown={unshown}
                />
                { (isLoggedIn && replyForm.depth == 0) && <ReplyForm 
                    onChange={handleTextChange} 
                    onSubmit={handleFormSubmit}
                    posibleCancel={false}
                /> }
            </Fragment>
        )
    }
}

//props값으로 넣어줄 상태 정의
const mapStateToProps = (state) => ({
    isLoggedIn: state.userInfo.isLoggedIn,
    contents: state.reply.contents,
    replies: state.reply.replies,
    replyForm: state.reply.replyForm,
    unshown: state.reply.unshown
})

//props값으로 넣어줄 액션 함수들 정의
const mapDispatchToProps = (dispatch) => ({
    textChange: (payload) => dispatch(replyActions.textChange(payload)),
    clear: () => dispatch(replyActions.clear()),
    getReplies: (payload) => dispatch(replyActions.getReplies(payload)),
    loadReplyForm: (space, id, depth) => dispatch(replyActions.loadReplyForm(space, id, depth)),
    displayOff: (id) => dispatch(replyActions.displayOff(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReplyContainer);