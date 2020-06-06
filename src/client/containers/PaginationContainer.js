import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch} from 'react-router-dom';
import { Pagination } from '~c/components';
import * as boardActions from '~c/store/board';
import WriteContainer from './WriteContainer';

class PaginationContainer extends Component {
    render () {
        const { category, now, max, interval } = this.props;
        return (
            <Pagination now={now} max={max} interval={interval} category={category}
            />
        );
    };
};

const mapStateToProps = (state) => ({
    category: state.board.category,
    now: state.board.now,
    max: state.board.max,
    interval: state.board.interval,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PaginationContainer);