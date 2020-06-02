import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { WriteForm } from '~c/components/index';
import * as boardActions from '~c/store/board';
import * as writeActions from '~c/store/write';
import { stringify } from 'query-string';
import { createPost } from '~c/services/posts';

class WriteContainer extends Component {
    constructor (props) {
        super(props);
        if (location.toString().indexOf('/write') != -1) {
            console.log('isModify : false');
            this.props.setIsModify(false);
        }
        // if (location.toString().indexOf('/info/privacy') != -1) {
        //     this.props.setIsModify(true);
        //     if (!this.props.onPending) {
        //         this.props.getUserInfo();
        //     }
        // }

        this.goBack = this.goBack.bind(this); 
    }

    componentWillUnmount() {
        console.log("on clear");
        this.props.clear();
    }

    goBack () {
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
        alert('글을 먼저 작성해주세요.');
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const { isModify, category, title, contents } = this.props;

        if (title == '' || contents == '') {
            this.alertReject();
            return false;
        }

        const formData = new FormData();
        formData.append('category', category);
        formData.append('title', title);
        formData.append('contents', contents);

        if (!isModify) createPost(formData);
        // else updateUser(formData);
    }

    render () {
        const { category } = this.props;
        const { goBack, handleTitleChange, handleContentsChange, handleFormSubmit } = this;

        return (
            <Fragment>
                <WriteForm 
                    category={category}
                    goBack={goBack}
                    onTitleChange={handleTitleChange}
                    onContentsChange={handleContentsChange}
                    onSubmit={handleFormSubmit}
                />
            </Fragment>
        );
    };
};

const mapStateToProps = (state) => ({
    category: state.board.category,
    isModify: state.write.isModify,
    title: state.write.title,
    contents: state.write.contents
})

const mapDispatchToProps = (dispatch) => ({
    inputChange: (payload) => dispatch(writeActions.inputChange(payload)),
    setIsModify: (payload) => dispatch(writeActions.setIsModify(payload)),
    clear: () => dispatch(writeActions.clear())
})

export default connect(mapStateToProps, mapDispatchToProps)(WriteContainer);