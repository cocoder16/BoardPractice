import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from '~c/components';

class PaginationContainer extends Component {
    render () {
        const { category, now, max, interval } = this.props;
        return (
            <Pagination 
                now={now} max={max} interval={interval} category={category}
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