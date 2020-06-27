import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import qs from 'query-string';
import { BoardHead, BoardBody, Article, RecentPosts } from '~c/components';
import * as boardActions from '~c/store/board';
import WriteContainer from './WriteContainer';

class BoardContainer extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        if (!this.props.onDelete && nextProps.onDelete) {
            return true;
        }

        if (this.props.searchType != nextProps.searchType
            || this.props.searchKeyword != nextProps.searchKeyword) {

            return false;
        }

        if (nextProps.onPending) {
            return false;
        } 
        return true;
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate (prevProps) {
        if (!(prevProps.onPending && !this.props.onPending)
            || location.pathname.split('/')[1] == 'delete') { // delete만 onPending 안씀.
            this.getData();
        }
        
        const menu = document.querySelector('.sidebar .menu');
        menu.classList.remove('show');
    }

    preGetData = () => {
        this.props.turnOnPending();
        this.props.clearArticle();
    }

    getData = () => {
        if (location.pathname == '/') {
            this.props.getRecentPosts();
            this.preGetData();
            sessionStorage.clear('article-id');
        } else if (location.pathname == '/qna' || location.pathname == '/forum') {
            const query = qs.parse(location.search);
            const category = location.pathname.split('/')[1];
            this.preGetData();
            if (query.type && query.keyword) {          
                this.props.search(category, query);
            } else {
                this.props.getPosts(category, query);
            }
            sessionStorage.clear('article-id');
        } else if (location.pathname.split('/')[1] == 'article') { 
            this.preGetData();
            this.props.getArticle(location.pathname.split('/article/')[1]);
        } else if (location.pathname.split('/')[1] == 'modify') {
            this.props.turnOnPending();
            this.props.getArticle(location.pathname.split('/modify/')[1]);
        } else if (location.pathname.split('/')[1] == 'delete') {
            this.props.getDeleteAlert();
        }
    }

    goBackOnDelete = () => {
        this.props.skimOnDelete();
        this.props.history.goBack();
    }

    handleDeletePost = async () => {
        const num = location.pathname.split('/delete/')[1];
        await this.props.deletePost(num);
        this.props.history.push(`/${this.props.category}`);
    }

    handleChangeSearchType = (e) => {
        e.preventDefault();
        this.props.setSearchType(e.target.value);
    }

    handleChangeSearchKeyword = (e) => {
        e.preventDefault();
        this.props.setSearchKeyword(e.target.value);
    }

    handleSearch = (e) => {
        e.preventDefault();
        const { category, searchType, searchKeyword } = this.props;
        this.props.history.push(`/${category}?type=${searchType}&keyword=${searchKeyword}`);
    }

    render () {
        const { category, isLoggedIn, onPending, posts, article, isModify, onDelete, 
            searchType, recentPosts, history } = this.props;
        const { goBackOnDelete, handleDeletePost, 
            handleChangeSearchType, handleChangeSearchKeyword, handleSearch } = this;

        let isHome = true;
        if (location.pathname != '/') isHome = false;

        return (
            <Fragment>
                { isHome 
                    ? <RecentPosts posts={recentPosts} onReady={!onPending}/>
                    :
                    <Fragment>
                        <BoardHead category={category} isLoggedIn={isLoggedIn} isModify={isModify} 
                            searchType={searchType} 
                            onChangeSearchType={handleChangeSearchType}
                            onChangeSearchKeyword={handleChangeSearchKeyword}
                            onSearch={handleSearch}
                        />
                        <Switch>
                            { !onPending &&
                                <Fragment>
                                    <Route exact path='/qna'
                                        render={() => <BoardBody posts={posts}/>}
                                    />
                                    <Route exact path='/forum'
                                        render={() => <BoardBody posts={posts}/>}
                                    />
                                    <Route path='/article'
                                        render={() => <Article article={article} auth={article.auth}
                                            id={article.id} history={history}
                                        />}
                                    />
                                    <Route exact path='/write' component={WriteContainer}/>
                                    <Route path='/modify' component={WriteContainer}/>
                                    <Route path='/delete'
                                        render={() => <Article article={article} 
                                            auth={article.auth} 
                                            onDelete={onDelete} 
                                            history={history}
                                            goBack={goBackOnDelete}
                                            deletePost={handleDeletePost}
                                        />}
                                    />
                                </Fragment>
                            }
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
    article: state.board.article,
    isModify: state.write.isModify,
    onDelete: state.board.onDelete,
    searchType: state.board.searchType,
    searchKeyword: state.board.searchKeyword,
    recentPosts: state.board.recentPosts,
    onPending: state.board.onPending
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
    getRecentPosts: () => dispatch(boardActions.getRecentPosts()),
    turnOnPending: () => dispatch(boardActions.turnOnPending()),
    clearArticle: () => dispatch(boardActions.clearArticle())
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);