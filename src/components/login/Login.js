import React from 'react';
import styled from 'styled-components';
import { elementsReact, elementsRedux, assets } from 'ElementsWebCommon';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter, Redirect } from 'react-router-dom';
import { lighten } from 'polished';


const {
  LabeledInput,
  headerHeight,
  Translation,
} = elementsReact;

const {
  languageSelectors: {
    getCurrentTranslations,
  },
  authSelectors: { getAuthErrorCode, isUserAuthenticated, },
  authActions: { loginUser, },
} = elementsRedux;

const {
  metricCardBoxShadow,
  humanyzeBlue,
  lightBorder,
} = assets;

const boxHeight = '40px';

const LoginPageWrapper = styled.div`
  height: calc(100vh - ${headerHeight});
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: ${metricCardBoxShadow};
  margin: 0 auto;
`;

const LoginFormTitle = styled.h1`
  font-size: 1.4rem;
  text-align: center;
`;

const LoginFormLabeledInput = styled(LabeledInput)`
  flex-direction: column;
  padding: 15px 0 0;

  .LabeledInput__label {
    font-size: 0.7rem;
    padding-bottom: 4px;
    text-align: left;
  }
  .LabelInput__input {
    border: 1px solid ${lightBorder};
    font-size: 0.9rem;
    height: ${boxHeight};
    display: flex;
    align-items: center;
  } 
`;

const SubmitButton = styled.button(({ disabled, }) => `
  background: ${humanyzeBlue};
  position: relative;
  color: white;
  border-radius: 4px;
  margin-top: 10px;
  width: 100%;
  height: ${boxHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  &:hover {
    color: white !important;
    background-color: ${lighten(0.1, humanyzeBlue)};
  }
  &:focus {
    border: 1px solid #eee;
  }
  ${ disabled ? 'opacity: 0.5; pointer-events: none;' : ''}  
`);

const ErrorDisplay = styled.div`
  margin-top: 10px;
  min-height: 20px;
  color: red;
  text-align: center;
`;

const useInputState = (initialState) => {
  const [
    value,
    setValue,
  ] = React.useState(initialState);
  const onInputChange = ({ target: { value, }, }) => setValue(value);
  return [
    value,
    onInputChange,
  ];
};

const LoginFormWrapper = ({ translations, loginUser, }) => {

  const [
    password,
    onPasswordChange,
  ] = useInputState('');

  const [
    email,
    onEmailChange,
  ] = useInputState('');

  const [
    loginPending,
    setLoginPending,
  ] = React.useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoginPending(true);
    try {
      await loginUser(email, password);
    }
    catch (e) {
      console.log('error logging in');
    }
    setLoginPending(false);
  };

  return (
    <div>
      <LoginForm className='LoginForm' onSubmit={onFormSubmit}>
        <React.Fragment>
          <LoginFormTitle>
            <Translation translationKey={'Login__title'} />
          </LoginFormTitle>
          <LoginFormLabeledInput
            placeholder={translations['Login__email-placeholder']}
            label={translations['Login__email-label']}
            onChange={onEmailChange}
            disabled={loginPending} />
          <LoginFormLabeledInput
            placeholder={translations['Login__password-placeholder']}
            label={translations['Login__password-label']}
            onChange={onPasswordChange}
            type='password'
            disabled={loginPending} />
          <SubmitButton type='submit'>
            <Translation translationKey={'Login__submit-button'} />
          </SubmitButton>
        </React.Fragment>
      </LoginForm>
    </div>
  );
};

const enhance = compose(
  connect(
    (state) => ({
      translations: getCurrentTranslations(state),
      authError: getAuthErrorCode(state),
      isAuthenticated: isUserAuthenticated(state),
    }),
    { loginUser, }
  ),
  withRouter
);

const Login = enhance(({ translations, loginUser, authError, isAuthenticated, location, })  => {

  const redirectTo = location.state ? location.state.redirectFrom : '/landing';

  return (
    isAuthenticated ?
      <Redirect to={redirectTo}/> :
      <LoginPageWrapper>
        <div>
          <LoginFormWrapper {...{ translations, loginUser, } } />
          <ErrorDisplay>
            {authError && authError.response ?
              authError.response.status === 400 ?
                <Translation translationKey={'Login__api-login-error'} />
                : <Translation translationKey={'Login__api-error-generic'} />
              : null}
          </ErrorDisplay>
        </div>
      </LoginPageWrapper>
  );
});

export default Login;
