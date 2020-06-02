import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PwResetForm, PwResetEmailSent } from '~c/components/index';
import * as pwResetActions from '~c/store/pwReset';
import { goAuthEmail } from '~c/services/users';

class PwResetContainer extends Component {
    constructor (props) {
        super(props);
        if (sessionStorage.getItem('sent email')) {
            this.props.sentEmail();
        } else {
            this.props.reAuth();
        }
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
        this.props.inputChange(value);
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();

        await this.props.formValidation();
        if (!this.props.pass) {
            console.log('fail form validation due to input value');
            return false;
        }

        const { id } = this.props;
        const formData = new FormData();
        formData.append('id', id);
        const result = await goAuthEmail(formData);
        console.log(result);
        if (result) {
            //next page
            sessionStorage.setItem('sent email', true);
            this.props.sentEmail();
        } else {
            //span reject message (id가 없어서)
            this.props.rejectMessage();
        }
    }

    render () {
        const { handleInputChange, handleFormSubmit } = this;
        const { span, isSentEmail } = this.props;

        return (
            <div>
                { isSentEmail
                    ? target = <PwResetEmailSent/>
                    : <PwResetForm 
                        onInputChange={handleInputChange} onFormSubmit={handleFormSubmit} spanText={span}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    id: state.pwReset.id,
    pass: state.pwReset.pass,
    span: state.pwReset.span,
    isSentEmail: state.pwReset.isSentEmail
})

//props값으로 넣어줄 액션 함수들 정의
const mapDispatchToProps = (dispatch) => ({
    inputChange: (payload) => dispatch(pwResetActions.inputChange(payload)),
    formValidation: () => dispatch(pwResetActions.formValidation()),
    sentEmail: () => dispatch(pwResetActions.sentEmail()),
    rejectMessage: () => dispatch(pwResetActions.rejectMessage()),
    reAuth: () => dispatch(pwResetActions.reAuth())
})

export default connect(mapStateToProps, mapDispatchToProps)(PwResetContainer);