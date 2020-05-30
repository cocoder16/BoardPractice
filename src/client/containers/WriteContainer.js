import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { WriteForm } from '~c/components/index';
import * as boardActions from '~c/store/board';
import * as writeActions from '~c/store/write';

class WriteContainer extends Component {
    constructor (props) {
        super(props);
        if (location.toString().indexOf('/write') != -1) {
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

    componentDidMount () {
        console.log(this.props);
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.props.inputChange({name: name, value: value});
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

        if (!isModify) createPosts(formData);
        // else updateUser(formData);
    }

    goBack () {
        this.props.history.goBack();
    }

    render () {
        const { category } = this.props;
        const { goBack, handleInputChange, handleFormSubmit } = this;

        return (
            <Fragment>
                <WriteForm 
                    category={category}
                    goBack={goBack}
                    onInputChange={handleInputChange}
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
    setCategory: (payload) => dispatch(boardActions.setCategory(payload)),
    inputChange: (payload) => dispatch(writeActions.inputChange(payload)),
    setIsModify: (payload) => dispatch(writeActions.setIsModify(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(WriteContainer);