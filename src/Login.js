import React from 'react';
// TODO: TEMP PAGE, WILL ULTIMATELY REDIRECT TO EMBER AUTH, SHARING TOKEN
import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { loginUser } from './redux/common/auth/authActions';
import { getAuthErrorCode } from './redux/common/auth/authReducer';


const onSubmit = ({ username, password, loginUser, }) => (e) => {
    e.preventDefault();
    loginUser(username, password);
};

const enhance = compose(
    withState('username', 'setUsername', 'demo@humanyze.com'),
    withState('password', 'setPassword', 'Password!1'),
    withHandlers({
        onUsernameChange: ({ setUsername, }) => ({ target, }) => setUsername(target.value),
        onPasswordChange: ({ setPassword, }) => ({ target, }) => setPassword(target.value),
        onSubmit,
    })
);

const LoginPure = ({
                       username, onUsernameChange,
                       password, onPasswordChange,
                       onSubmit,
                   }) => (
    <div className='Login'>
        <form onSubmit={onSubmit}>
            <input value={username} onChange={onUsernameChange} placeholder='username'/>
            <input value={password} onChange={onPasswordChange} placeholder='username'/>
            <button type='submit'>Login</button>
        </form>
    </div>
);


const Login = connect(
    (state) => ({ errorCode: getAuthErrorCode(state), }),
    { loginUser, }
)(enhance(LoginPure));

export default Login;
