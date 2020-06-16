import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import qs from 'query-string';
import { BoardHead, BoardBody, Article, RecentPosts } from '~c/components';
import * as boardActions from '~c/store/board';
import WriteContainer from './WriteContainer';

class BoardContainer extends Component {
    constructor (props) {
        super(props);
        console.log('con');
        this.getData();

        this.goBackOnDelete = this.goBackOnDelete.bind(this); //왜 붙였지?
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => { //링크 이동시 호출하려고, componentDidUpdate에서 호출하면 무한루프
            console.log("on route change");
            console.log(location.pathname);
            console.log(location.search);
            console.log(history);
            this.getData();
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    componentDidUpdate (prevProps) {
        if (prevProps.isLoggedIn != this.props.isLoggedIn
            && (location.pathname.split('/')[1] == 'article'
            || location.pathname.split('/')[1] == 'modify'
            || location.pathname.split('/')[1] == 'delete')) {
            this.getData();
        }
        const menu = document.querySelector('.sidebar .menu');
        menu.classList.remove('show');
    }

    getData = () => {
        if (location.pathname == '/') {
            this.props.getRecentPosts();
            sessionStorage.clear('article-id');
        } else if (location.pathname == '/qna' || location.pathname == '/forum') {
            const query = qs.parse(location.search);
            const category = location.pathname.split('/')[1]
            if (query.type && query.keyword) {
                console.log(query);                
                this.props.search(category, query);
            } else {
                this.props.getPosts(category, query);
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
            searchType, searchKeyword, recentPosts } = this.props;
        const { goBackOnDelete, handleDeletePost, handleChangeSearchType, handleChangeSearchKeyword } = this;

        let isHome = true;
        if (location.pathname != '/') isHome = false;

        return (
            <Fragment>
                { isHome 
                    ? <RecentPosts posts={recentPosts} onReady={listOnReady}/>
                    :
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
                                    id={article.id}
                                />}
                            />
                            <Route exact path='/write' component={WriteContainer}/>
                            <Route path='/modify' component={WriteContainer}/>
                            <Route path='/delete'
                                render={() => <Article auth={article.auth} onDelete={onDelete} 
                                    goBack={goBackOnDelete}
                                    deletePost={handleDeletePost}
                                />}
                            />
                        </Switch>
                    </Fragment>
                }
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
    recentPosts: state.board.recentPosts
})

const mapDispatchToProps = (dispatch) => ({
    getPosts: (category, query) => dispatch(boardActions.getPosts(category, query)),
    getArticle: (id) => dispatch(boardActions.getArticle(id)),
    getDeleteAlert: () => dispatch(boardActions.getDeleteAlert()),
    skimOnDelete: () => dispatch(boardActions.skimOnDelete()),
    deletePost: (id) => dispatch(boardActions.deletePost(id)),
    setSearchType: (val) => dispatch(boardActions.setSearchType(val)),
    setSearchKeyword: (val) => dispatch(boardActions.setSearchKeyword(val)),
    search: (cate, query) => dispatch(boardActions.search(cate, query)),
    getRecentPosts: () => dispatch(boardActions.getRecentPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);