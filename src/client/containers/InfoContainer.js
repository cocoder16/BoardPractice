import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';
import { InfoHead, InfoBody } from '~c/components';
import * as boardActions from '~c/store/board';

class InfoContainer extends Component {
    constructor (props) {
        super(props);
        console.log('a');
        this.getData();
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => { 
            console.log("on route change");
            this.getData();
        });
        this.activation();
    }

    componentWillUnmount() {
        this.unlisten();
    }

    componentDidUpdate (prevProps) {
        if (prevProps.isLoggedIn != this.props.isLoggedIn) {
            this.getData();
        }
        this.activation();
    }

    getData () {
        if (location.pathname == '/info/posts' || location.pathname == '/info/replies') {
            console.log('x');
            const query = qs.parse(location.search);
            this.props.getUserWrote(location.pathname.split('/info/')[1], query);
        }
    }

    activation () {
        if (document.querySelector('.info-head .link.active')) {
            document.querySelector('.info-head .link.active').classList.remove('active');
        }
        if (location.pathname == '/info/privacy') {
            document.querySelectorAll('.info-head .link')[0].classList.add('active');
        } else if (location.pathname == '/info/posts') {
            document.querySelectorAll('.info-head .link')[1].classList.add('active');
        } else if (location.pathname == '/info/replies') {
            document.querySelectorAll('.info-head .link')[2].classList.add('active');
        }
    }

    render () {
        const { posts, replies } = this.props;

        return (
            <Fragment>
                <InfoHead/>
                <InfoBody posts={posts} replies={replies}/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.board.userPosts,
    replies: state.board.userReplies
})

const mapDispatchToProps = (dispatch) => ({
    getUserWrote: (type, query) => dispatch(boardActions.getUserWrote(type, query))
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer);