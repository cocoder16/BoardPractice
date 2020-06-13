import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoggedOut, LoggedIn } from '~c/components';
import * as userInfoActions from '~c/store/userInfo';
import * as boardActions from '~c/store/board';
import { tryLogOut } from '~c/services/users';

class UserContainer extends Component {
    handleLogOut = async () => {
        const result = await tryLogOut();
        console.log(result);
        if (result) {
            this.props.deleteUserInfo();
            this.props.deleteUserWrote();
            console.log(this.props.isLoggedIn);
            window.location.replace('/');
        }
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
    deleteUserWrote: () => dispatch(boardActions.deleteUserWrote())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);