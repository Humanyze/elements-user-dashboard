import React from 'react';
import styled from 'styled-components';
import { elementsReact, elementsRedux, assets, routerPaths } from 'ElementsWebCommon';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { lighten } from 'polished';
import { landingRoute } from '../../App';


const {
  LabeledInput,
  headerHeight,
  Translation,
} = elementsReact;

const {
  languageSelectors: {
    getCurrentTranslations,
  },
  authSelectors: { isUserAuthenticated, getAuthErrorCode, },
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

const LoginFormWrapper = styled.div`
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

const ErrorDisplayBlock = styled.div`
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

const LoginPageWrapper = () =>
{
  
}

const enhance = compose(
  connect(
    (state) => ({
      translations: getCurrentTranslations(state),
      authenticated: isUserAuthenticated(state),
      authError: getAuthErrorCode(state),
    }),
    { loginUser, }
  ),
  withRouter
);

const LoginPage = enhance(({ translations, authenticated, authError, loginUser, }) => {
  
  debugger;
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

  const [
    errorState,
    setErrorState,
  ] = React.useState({});

  const onFormSubmit = async (e) => {
    e.preventDefault();

    setLoginPending(true);
    try {
      const loginResponse = await loginUser(email, password);
    }
    catch (e) {
      setErrorState({ genericError: true, });
    }
    setLoginPending(false);
  };

  return (
    <div>
      <LoginPageWrapper onSubmit={onFormSubmit}>
        <LoginFormWrapper>
        <LoginForm className='LoginForm'>
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
        <React.Fragment>
        <ErrorDisplayBlock>
          {
            errorState.loginError ?
              <Translation translationKey={'Login__api-login-error'} /> :
                errorState.genericError ?
                  <Translation translationKey={'Login__api-error-generic'} /> :
                    null
          }
        </ErrorDisplayBlock>
        </React.Fragment>
        </LoginFormWrapper>
      </LoginPageWrapper>
    </div>
  );
});

export default LoginPage;
