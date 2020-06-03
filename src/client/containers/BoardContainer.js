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

    getData () {
        if (location.pathname == '/qna') {
            this.props.getPosts('qna');
        }
        else if (location.pathname == '/forum') {
            this.props.getPosts('forum');
        }
        else if (location.pathname.split('/')[1] == 'article') {
            this.props.getArticle(location.pathname.split('/article/')[1]);
        }
        else if (location.pathname.split('/')[1] == 'modify') {
            this.props.getArticle(location.pathname.split('/modify/')[1]);
        }
    }

    render () {
        const { category, isLoggedIn, listOnReady, posts, articleOnReady, article, auth, isModify } = this.props;

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
                        id={article.id}/>}/>
                    <Route exact path='/write' component={WriteContainer}/>
                    <Route path='/modify' component={WriteContainer}/>
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
})

const mapDispatchToProps = (dispatch) => ({
    getPosts: (payload) => dispatch(boardActions.getPosts(payload)),
    getArticle: (payload) => dispatch(boardActions.getArticle(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);