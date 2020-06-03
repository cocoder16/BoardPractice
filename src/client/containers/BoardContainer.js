import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch} from 'react-router-dom';
import { BoardHead, BoardBody, Article } from '~c/components/index';
import * as boardActions from '~c/store/board';
import WriteContainer from './WriteContainer';

class BoardContainer extends Component {
    constructor (props) {
        super(props);
        this.getData();

        this.goBackOnDelete = this.goBackOnDelete.bind(this); //왜 붙였지?
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            console.log("on route change");
            this.getData();
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    getData = () => {
        if (location.pathname == '/qna') {
            console.log(location.search);
            this.props.getPosts('qna', location.search);
        } else if (location.pathname == '/forum') {
            this.props.getPosts('forum', location.search);
        } else if (location.pathname.split('/')[1] == 'article') {
            this.props.getArticle(location.pathname.split('/article/')[1]);
        } else if (location.pathname.split('/')[1] == 'modify') {
            this.props.getArticle(location.pathname.split('/modify/')[1]);
        } else if (location.pathname.split('/')[1] == 'delete') {
            this.props.getDeleteAlert();
        }
    }

    goBackOnDelete = () => {
        this.props.skimOnDelete();
        this.props.history.goBack();
    }

    handleDeletePost = () => {
        this.props.deletePost(location.pathname.split('/delete/')[1]);
    }

    render () {
        const { category, isLoggedIn, listOnReady, posts, articleOnReady, article, auth, isModify, onDelete } = this.props;
        const { goBackOnDelete, handleDeletePost } = this;

        return (
            <Fragment>
                <BoardHead category={category} isLoggedIn={isLoggedIn} isModify={isModify}/>
                <Switch>
                    <Route exact path='/qna'
                    render={() => <BoardBody onReady={listOnReady} posts={posts}/>}/>
                    <Route exact path='/forum'
                    render={() => <BoardBody onReady={listOnReady} posts={posts}/>}/>
                    <Route path='/article'
                    render={() => <Article onReady={articleOnReady} article={article} auth={auth}
                        id={article.id}/>}
                    />
                    <Route exact path='/write' component={WriteContainer}/>
                    <Route path='/modify' component={WriteContainer}/>
                    <Route path='/delete'
                    render={() => <Article auth={auth} onDelete={onDelete} goBack={goBackOnDelete}
                        deletePost={handleDeletePost}/>}
                    />
                </Switch>
            </Fragment>
        );
    };
};

const mapStateToProps = (state) => ({
    category: state.board.category,
    isLoggedIn: state.userInfo.isLoggedIn,
    posts: state.board.posts,
    listOnReady: state.board.listOnReady,
    article: state.board.article,
    articleOnReady: state.board.articleOnReady,
    auth: state.board.auth,
    isModify: state.write.isModify,
    onDelete: state.board.onDelete
})

const mapDispatchToProps = (dispatch) => ({
    getPosts: (category, queryString) => dispatch(boardActions.getPosts(category, queryString)),
    getArticle: (payload) => dispatch(boardActions.getArticle(payload)),
    getDeleteAlert: () => dispatch(boardActions.getDeleteAlert()),
    skimOnDelete: () => dispatch(boardActions.skimOnDelete()),
    deletePost: (payload) => dispatch(boardActions.deletePost(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);