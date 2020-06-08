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
    }

    componentWillUnmount() {
        this.unlisten();
    }

    componentDidUpdate (prevProps) {
        if (prevProps.isLoggedIn != this.props.isLoggedIn) {
            this.getData();
        }
    }

    getData () {
        if (location.pathname == '/info/posts' || location.pathname == '/info/replies') {
            console.log('x');
            const query = qs.parse(location.search);
            this.props.getUserWrote(location.pathname.split('/info/')[1], query);
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