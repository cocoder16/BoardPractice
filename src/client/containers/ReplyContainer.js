import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ReplyForm, ReplyList } from '~c/components';
import * as replyActions from '~c/store/reply';
import { createReply } from '~c/services/replies';

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
        const { contents } = this.props;

        const formData = new FormData();
        formData.append('post_id', location.pathname.split('/article/')[1]);
        formData.append('contents', contents);

        const result = await createReply(formData);
        console.log(result);
        if (result) {
            document.querySelector('.reply-form .contents').value = '';
            this.props.clear();
            this.props.getReplies(location.pathname.split('/article/')[1]);
        } else {
            alert('댓글 등록에 실패했습니다.');
        }
    }

    render() {
        const { handleTextChange, handleFormSubmit } = this;
        const { replies, isLoggedIn } = this.props;

        return (
            <Fragment>
                <ReplyList replies={replies}/>
                { isLoggedIn && <ReplyForm onChange={handleTextChange} onSubmit={handleFormSubmit}/> }
            </Fragment>
        )
    }
}

//props값으로 넣어줄 상태 정의
const mapStateToProps = (state) => ({
    isLoggedIn: state.userInfo.isLoggedIn,
    contents: state.reply.contents,
    replies: state.reply.replies
})

//props값으로 넣어줄 액션 함수들 정의
const mapDispatchToProps = (dispatch) => ({
    textChange: (payload) => dispatch(replyActions.textChange(payload)),
    clear: () => dispatch(replyActions.clear()),
    getReplies: (payload) => dispatch(replyActions.getReplies(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReplyContainer);