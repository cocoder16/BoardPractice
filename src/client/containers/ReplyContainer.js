import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ReplyForm, ReplyList } from '~c/components';
import * as boardActions from '~c/store/board';
import * as replyActions from '~c/store/reply';
import { createReply, updateReply, deleteReply } from '~c/services/replies';
import '~/modules/closest';

class ReplyContainer extends Component {
    constructor (props) {
        super(props);

        console.log(Element.prototype.closest);
        this.props.getReplies(location.pathname.split('/article/')[1]);
    }

    shouldComponentUpdate (nextProps) {
        console.log('#### Reply - should component update ####');
        return true;
    }

    componentDidUpdate (prevProps, prevState) {
        console.log('#### Reply - componentDidUpdate ####');
        const { unshown, replyForm, contents, deleteMode, isLoggedIn } = this.props;
        if (prevProps.unshown != unshown) {
            document.querySelector('.reply-form .contents').value = this.props.contents;
        }
        if (replyForm.space !== null && (prevProps.contents == contents 
            || prevProps.unshown != 0 && unshown == 0)) {

            if (prevProps.deleteMode == deleteMode || deleteMode == 0) { //삭제인 경우에는 포커싱 패스.
                const tar = document.querySelectorAll(`li[data-id="${replyForm.id}"]`)[0];
                this.focusingForm(replyForm.space, tar);
            }
        }
        if (prevProps.isLoggedIn != this.props.isLoggedIn) {
            this.props.getReplies(location.pathname.split('/article/')[1]);
        }
        if (prevProps.replies != this.props.replies) {
            window.scrollTo(0, this.props.scrollTop);
            this.props.setScroll(0);
        }
    }

    componentWillUnmount () {
        this.props.clearReplies();
        this.clearFocusingForm();
    }

    handleTextChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
        this.props.textChange(value);
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        this.props.setScroll(window.pageYOffset);
        const { contents, replyForm, unshown } = this.props;
        const articleId = location.pathname.split('/article/')[1];
        if (contents == '') {
            alert('Please fill out contents');
            return null;
        }
        const formData = new FormData();
        formData.append('contents', contents);

        if (unshown == 0) {
            formData.append('post_id', articleId);
            formData.append('depth', replyForm.depth);
            formData.append('parent_id', replyForm.id);
            if (this.props.replyForm.parent_nickname) {
                formData.append('parent_nickname', this.props.replyForm.parent_nickname);
            }
            await createReply(formData);
            this.props.replyCountUp();
        } else {
            formData.append('id', replyForm.id);
            await updateReply(formData);
        }

        document.querySelector('.reply-form .contents').value = '';
        this.props.clear();
        this.props.getReplies(articleId);
    }

    loadReplyForm = (e) => {
        e.preventDefault();
        if (!this.props.isLoggedIn) return null;
        this.props.clear();
        const targetLi = e.target.closest('li');
        const depth = targetLi.getAttribute('data-depth');
        console.log(targetLi);
        console.log(depth);
        let prevEle = targetLi;
        let nextEle;
        if (targetLi.nextSibling) {
            nextEle = targetLi.nextSibling;
            while (nextEle.getAttribute('data-depth') > depth) {
                console.log('aa');
                console.log(prevEle);
                console.log(nextEle);
                prevEle = nextEle;
                nextEle = nextEle.nextSibling;
                if (!nextEle) break;
            }
        }
        console.log(prevEle);
        console.log('#author');
        this.props.loadReplyForm(prevEle.getAttribute('data-id'), targetLi.getAttribute('data-id'), 
            depth*1 + 1, targetLi.querySelector('.author').textContent);
    }

    focusingForm (space, idTarget) {
        this.clearFocusingForm();
        window.location.replace(`${location.pathname}#comment_${space}`);
        if (idTarget) idTarget.classList.add('active');
        document.querySelector('.reply-form textarea').focus();
    }

    clearFocusingForm () {
        const prev = document.querySelector('.replies .reply.active');
        console.log('clearFocusingForm');
        console.log(prev);
        if (prev) {
            document.querySelector('.replies .reply.active').classList.remove('active');
        }
    }

    onModifyMode = (e) => {
        e.preventDefault();
        this.clear();

        const reply = e.target.closest('li');
        console.log(reply);
        const id = reply.getAttribute('data-id');
        const contents = reply.querySelector('.contents .body').textContent;
        this.props.displayOff(id);
        this.props.loadContents(contents);
        this.props.loadReplyForm(id, id);
    }

    onDeleteMode = (e) => {
        e.preventDefault();
        const reply = e.target;
        const id = reply.getAttribute('data-id');
        this.props.onDeleteMode(id);
    }

    offDeleteMode = (e) => {
        e.preventDefault();
        this.props.onDeleteMode(0);
    }

    onDelete = async (e) => {
        e.preventDefault();
        const articleNum = location.pathname.split('/article/')[1];
        await deleteReply(e.target.getAttribute('data-id'), articleNum);

        this.props.clear();
        this.props.getReplies(articleNum);
        this.props.replyCountDown();
    }

    clear = () => {
        this.clearFocusingForm();
        this.props.clear();
    }
    
    render() {
        const { handleTextChange, handleFormSubmit, loadReplyForm, onModifyMode,
            onDeleteMode, offDeleteMode, onDelete, clear } = this;
        const { replies, isLoggedIn, replyForm, unshown, deleteMode, onPending } = this.props;

        return (
            <Fragment>
                { !onPending &&
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
                            onDeleteMode={onDeleteMode}
                            deleteMode={deleteMode}
                            offDeleteMode={offDeleteMode}
                            onDelete={onDelete}
                        />
                        { (isLoggedIn && replyForm.depth == 0) && 
                            <ReplyForm 
                                onChange={handleTextChange} 
                                onSubmit={handleFormSubmit}
                                posibleCancel={false}
                            /> 
                        }
                    </Fragment>
                }
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
    unshown: state.reply.unshown,
    deleteMode: state.reply.deleteMode,
    onPending: state.reply.onPending,
    scrollTop: state.reply.scrollTop
})

//props값으로 넣어줄 액션 함수들 정의
const mapDispatchToProps = (dispatch) => ({
    textChange: (value) => dispatch(replyActions.textChange(value)),
    clear: () => dispatch(replyActions.clear()),
    getReplies: (post_id) => dispatch(replyActions.getReplies(post_id)),
    loadReplyForm: (space, id, depth, parent_nickname) => dispatch(replyActions.loadReplyForm(space, id, depth, parent_nickname)),
    displayOff: (id) => dispatch(replyActions.displayOff(id)),
    loadContents: (contents) => dispatch(replyActions.loadContents(contents)),
    onDeleteMode: (id) => dispatch(replyActions.onDeleteMode(id)),
    clearReplies: () => dispatch(replyActions.clearReplies()),
    replyCountUp: () => dispatch(boardActions.replyCountUp()),
    replyCountDown: () => dispatch(boardActions.replyCountDown()),
    setScroll: (top) => dispatch(replyActions.setScroll(top))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReplyContainer);