import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const LogInForm = ({
    failSpan, onInputChange, onFormSubmit
}) => {
    return (
        <Fragment>
            <form onSubmit={onFormSubmit}>
                <table><tbody>
                    <tr>
                        <td>아이디</td>
                        <td>
                            <input type='text' maxLength='12' name='id'
                                onChange={onInputChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td>
                            <input type='password' maxLength='12' name='pw'
                                onChange={onInputChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2'><span>{failSpan}</span></td>
                    </tr>
                </tbody></table>
                <input type='submit' value='로그인'/>
            </form>
            <Link to="/signup" className='link'>회원가입</Link>
            <Link to="/help/pwreset" className='link'>비밀번호 재설정</Link>
        </Fragment>
    )
};

export default LogInForm;