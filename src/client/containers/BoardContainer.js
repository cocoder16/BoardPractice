import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch} from 'react-router-dom';
import { BoardHead, BoardBody } from '~c/components/index';
import * as boardActions from '~c/store/board';

class BoardContainer extends Component {
    constructor (props) {
        super(props);
        this.handleCategoryChange();
    }

    handleCategoryChange () {
        if (location.toString().indexOf('/qna') != -1) {
            this.props.setCategory('qna');
        } else if (location.toString().indexOf('/forum') != -1) {
            this.props.setCategory('forum');
        }
    }
    
    componentDidUpdate () {
        this.handleCategoryChange();
    }

    render () {
        const { category, isLoggedIn } = this.props;

        return (
            <Fragment>
                <BoardHead category={category} isLoggedIn={isLoggedIn}/>
                <BoardBody/>
            </Fragment>
        );
    };
};

const mapStateToProps = (state) => ({
    category: state.board.category,
    isLoggedIn: state.userInfo.isLoggedIn
})

const mapDispatchToProps = (dispatch) => ({
    setCategory: (payload) => dispatch(boardActions.setCategory(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);