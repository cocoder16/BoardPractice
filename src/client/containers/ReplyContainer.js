import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ReplyForm, ReplyList } from '~c/components';
import * as replyActions from '~c/store/reply';
import { createReply } from '~c/services/replies';

class ReplyContainer extends Component {

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
        if (result) {
            this.props.clear();
        }
        //result true면 내 댓글로 화면 이동
        //false면 댓글등록에 실패했습니다. alert
    }

    render() {
        const { handleTextChange, handleFormSubmit } = this;
        const { isLoggedIn } = this.props;

        return (
            <Fragment>
                { isLoggedIn && <ReplyForm onChange={handleTextChange} onSubmit={handleFormSubmit}/> }
                <ReplyList/>
            </Fragment>
        )
    }
}

//props값으로 넣어줄 상태 정의
const mapStateToProps = (state) => ({
    isLoggedIn: state.userInfo.isLoggedIn,
    contents: state.reply.contents
})

//props값으로 넣어줄 액션 함수들 정의
const mapDispatchToProps = (dispatch) => ({
    textChange: (payload) => dispatch(replyActions.textChange(payload)),
    clear: () => dispatch(replyActions.clear())
})

export default connect(mapStateToProps, mapDispatchToProps)(ReplyContainer);