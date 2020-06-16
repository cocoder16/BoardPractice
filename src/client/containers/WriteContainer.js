import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WriteForm } from '~c/components';
import * as writeActions from '~c/store/write';
import * as boardActions from '~c/store/board';
import { createPost, updatePost } from '~c/services/posts';

class WriteContainer extends Component {
    constructor (props) {
        super(props);
        if (location.pathname == '/write') {
            console.log('isModify : false');
            this.props.setIsModify(false);
        }
        if (location.pathname.split('/')[1] == 'modify') {
            this.props.setIsModify(true);
        }

        this.goBack = this.goBack.bind(this);
    }

    componentDidUpdate (prevProps, prevState) {
        console.log('#### Write - component did update ####')
        if ((prevProps.onPending && !this.props.onPending && this.props.isModify)) {
            document.getElementsByName('title')[0].value = this.props.article.title;
            this.props.setInputValue({title: this.props.article.title, contents: this.props.article.contents});
        }
    }

    componentWillUnmount () {
        console.log("on clear");
        this.props.setIsModify(false);
        this.props.clear();
        this.props.pendingOff();
    }

    goBack = () => {
        this.props.clear();
        this.props.pendingOff();
        this.props.history.goBack();
    }

    handleTitleChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
        this.props.inputChange({name: 'title', value: value});
    }

    handleContentsChange = (data) => {
        this.props.inputChange({name: 'contents', value: data});
    }

    alertReject () {
        alert('The contents is missing.');
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const { isModify, category, title, contents } = this.props;

        if (title == '' || contents == '') {
            this.alertReject();
            return false;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('contents', contents);

        if (!isModify) {
            formData.append('category', category);
            createPost(formData);
        }
        else {
            formData.append('id', location.pathname.split('/modify/')[1]);
            updatePost(formData);
        }
    }

    render () {
        const { goBack, handleTitleChange, handleContentsChange, handleFormSubmit } = this;
        const { isModify, contents } = this.props;

        console.log('render');
        console.log(isModify);
        return (
            <WriteForm 
                goBack={goBack}
                onTitleChange={handleTitleChange}
                onContentsChange={handleContentsChange}
                onSubmit={handleFormSubmit}
                contents={contents}
            />
        );
    };
};

const mapStateToProps = (state) => ({
    article: state.board.article,
    onPending: state.board.onPending,

    category: state.board.category,
    isModify: state.write.isModify,
    title: state.write.title,
    contents: state.write.contents,
})

const mapDispatchToProps = (dispatch) => ({
    inputChange: (payload) => dispatch(writeActions.inputChange(payload)),
    setIsModify: (isModify) => dispatch(writeActions.setIsModify(isModify)),
    clear: () => dispatch(writeActions.clear()),
    setInputValue: (payload) => dispatch(writeActions.setInputValue(payload)),
    pendingOff: () => dispatch(boardActions.pendingOff())
})

export default connect(mapStateToProps, mapDispatchToProps)(WriteContainer);