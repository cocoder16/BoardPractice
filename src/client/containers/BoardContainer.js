import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import qs from 'query-string';
import { BoardHead, BoardBody, Article } from '~c/components';
import * as boardActions from '~c/store/board';
import WriteContainer from './WriteContainer';

class BoardContainer extends Component {
    constructor (props) {
        super(props);
        console.log('con');
        this.getData();

        console.log(this.props);

        this.goBackOnDelete = this.goBackOnDelete.bind(this); //왜 붙였지?
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => { //링크 이동시 호출하려고, componentDidUpdate에서 호출하면 무한루프
            console.log("on route change");
            this.getData();
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    componentDidUpdate (prevProps) {
        if (prevProps.isLoggedIn != this.props.isLoggedIn) {
            this.getData();
        }
    }

    getData = () => {
        console.log('b');
        if (location.pathname == '/qna') {
            const query = qs.parse(location.search);
            if (query.type && query.keyword) {
                console.log(query);                
                this.props.search('qna', query);
            } else {
                this.props.getPosts('qna', query);
            }
            sessionStorage.clear('article-id');
        } else if (location.pathname == '/forum') {
            const query = qs.parse(location.search);
            if (query.type && query.keyword) {
                this.props.search('forum', query);
            } else {
                this.props.getPosts('forum', query);
            }
            sessionStorage.clear('article-id');
        } else if (location.pathname.split('/')[1] == 'article') {
            console.log('getData');
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

    handleChangeSearchType = (e) => {
        e.preventDefault();
        this.props.setSearchType(e.target.value);
    }

    handleChangeSearchKeyword = (e) => {
        e.preventDefault();
        this.props.setSearchKeyword(e.target.value);
    }

    render () {
        const { category, isLoggedIn, listOnReady, posts, articleOnReady, article, isModify, onDelete, 
            searchType, searchKeyword } = this.props;
        const { goBackOnDelete, handleDeletePost, handleChangeSearchType, handleChangeSearchKeyword } = this;

        return (
            <Fragment>
                <BoardHead category={category} isLoggedIn={isLoggedIn} isModify={isModify} 
                    searchType={searchType} searchKeyword={searchKeyword}
                    onChangeSearchType={handleChangeSearchType}
                    onChangeSearchKeyword={handleChangeSearchKeyword}
                />
                <Switch>
                    <Route exact path='/qna'
                        render={() => <BoardBody onReady={listOnReady} posts={posts}/>}
                    />
                    <Route exact path='/forum'
                        render={() => <BoardBody onReady={listOnReady} posts={posts}/>}
                    />
                    <Route path='/article'
                        render={() => <Article onReady={articleOnReady} article={article} auth={article.auth}
                        id={article.id}/>}
                    />
                    <Route exact path='/write' component={WriteContainer}/>
                    <Route path='/modify' component={WriteContainer}/>
                    <Route path='/delete'
                        render={() => <Article auth={article.auth} onDelete={onDelete} goBack={goBackOnDelete}
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
    isModify: state.write.isModify,
    onDelete: state.board.onDelete,
    searchType: state.board.searchType,
    searchKeyword: state.board.searchKeyword,
})

const mapDispatchToProps = (dispatch) => ({
    getPosts: (category, query) => dispatch(boardActions.getPosts(category, query)),
    getArticle: (payload) => dispatch(boardActions.getArticle(payload)),
    getDeleteAlert: () => dispatch(boardActions.getDeleteAlert()),
    skimOnDelete: () => dispatch(boardActions.skimOnDelete()),
    deletePost: (payload) => dispatch(boardActions.deletePost(payload)),
    setSearchType: (val) => dispatch(boardActions.setSearchType(val)),
    setSearchKeyword: (val) => dispatch(boardActions.setSearchKeyword(val)),
    search: (cate, query) => dispatch(boardActions.search(cate, query))
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);