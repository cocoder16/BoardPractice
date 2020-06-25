import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PwResetCompleted } from '~c/components';
import qs from 'query-string';
import * as pwResetActions from '~c/store/pwReset';

class PwResetCompletedContainer extends Component {
    constructor (props) {
        super(props);
        const query = qs.parse(location.search);
        if (sessionStorage.getItem('received newPw')) {
            this.props.reinitial();
        } else {
            this.props.getNewPw(query);
        }
    }

    render () {
        const { onPending, failed, newPw } = this.props;
        let target;
        
        if (failed) {
            target = <p>Identification failed. Please try again.</p>
        } else {
            if (onPending) target = <p>Please wait a moment.</p>
            else target = <PwResetCompleted newPassword={newPw}/>
        }

        return (
            <Fragment>
                {target}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    onPending: state.pwReset.onPending,
    failed: state.pwReset.failed,
    newPw: state.pwReset.newPw
})

//props값으로 넣어줄 액션 함수들 정의
const mapDispatchToProps = (dispatch) => ({
    getNewPw: (query) => dispatch(pwResetActions.getNewPw(query)),
    reinitial: () => dispatch(pwResetActions.reinitial())
})

export default connect(mapStateToProps, mapDispatchToProps)(PwResetCompletedContainer);