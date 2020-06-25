import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoggedOut, LoggedIn } from '~c/components';
import * as userInfoActions from '~c/store/userInfo';
import * as boardActions from '~c/store/board';
import * as replyActions from '~c/store/reply';
import { tryLogOut } from '~c/services/users';

class UserContainer extends Component {
    handleLogOut = async () => {
        await tryLogOut();

        if (location.pathname.split('/')[1] == 'info') {
            location.replace('/');
        }

        this.props.clear();
        this.props.deleteUserInfo();
        this.props.deleteUserWrote();
    }

    render () {        
        const { isLoggedIn, deviceType } = this.props;
        const { handleLogOut } = this;
        return (     
            <div className='user-box'>
                { !isLoggedIn ?
                    <LoggedOut
                        deviceType={deviceType}
                    /> :
                    <LoggedIn 
                        logOut={handleLogOut} deviceType={deviceType}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.userInfo.isLoggedIn,
    deviceType: state.viewport.type
})

const mapDispatchToProps = (dispatch) => ({
    deleteUserInfo: () => dispatch(userInfoActions.deleteUserInfo()),
    deleteUserWrote: () => dispatch(boardActions.deleteUserWrote()),
    clear: () => dispatch(replyActions.clear())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);