import React from 'react';
import styled from 'styled-components';
import { elementsReact, elementsRedux, assets, routerPaths } from 'ElementsWebCommon';
import { connect } from 'react-redux';
import memoize from 'fast-memoize';
import Moment from 'moment';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { lighten } from 'polished';
const {
  LabeledInput,
  headerHeight,
  Translation,
  LoadingUI,
  Utils: {
    parse,
  },
} = elementsReact;

const {
  languageSelectors: {
    getCurrentTranslations,
  },
  AxiosRequestService,
} = elementsRedux;
const {
  metricCardBoxShadow,
  humanyzeBlue,
  lightBorder,
} = assets;

const s3DownloadUrlBase = 'http://downloads.humanyze.com/legal/v';

const termsOfServiceVersion = '1';
const termsOfServiceUrl = `${s3DownloadUrlBase}${termsOfServiceVersion}/terms_of_service.pdf`;

const privacyPolicyVersion = '1';
const privacyPolicyUrl = `${s3DownloadUrlBase}${privacyPolicyVersion}/privacy_policy.pdf`;

const boxHeight = '40px';

const RegisterPageWrapper = styled.div`
  height: calc(100vh - ${headerHeight});
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterForm = styled.form`
  width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: ${metricCardBoxShadow};
`;

const RegisterFormTitle = styled.h1`
  font-size: 1.4rem;
  text-align: center;
`;

const RegisterFormHeader = styled.div`
  text-align: center;
  padding: 20px;
`;

const EmailSpan = styled.span`
  color: ${humanyzeBlue};
`;


const RegisterFormLabeledInput = styled(LabeledInput)`
  flex-direction: column;
  padding: 15px 0 0;

  .LabeledInput__label {
    font-size: 0.7rem;
    padding-bottom: 4px;
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

const SubmitLoadingUI = styled(LoadingUI)`
  .la-line-spin-clockwise-fade {
    width: 40px !important;
    height: 40px !important;
    & > div {
      width: 2px !important;
      height: 6px !important;
      margin-top: -3px !important;
      margin-left: 0 !important;
      background: white;
    }
  }
`;

const ValidationMessage = styled.div`
  height: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  color: red;
  font-size: 0.7rem;
`;

const ExpiredMessage = styled.div`
  padding: 30px 0;
`;

const PolicyLink = styled.a`
  color: ${humanyzeBlue};
`;

const LoginFooter = styled.div`
  font-size: 0.8rem;
  padding-top: 10px; 
  padding-left: 5px;
  a {
    color: ${humanyzeBlue};
  }
`;

const memoizedQueryStringParser = memoize(parse);

const NoTokenErrorMessage = () => (
  <RegisterForm>
    <Translation translationKey={'Register__no-token-message'} />
  </RegisterForm>
);

const RegisterHOC = (Comp) => withRouter(({ history, }) => {

  const {
    token,
    email,
    expiration,
  } = memoizedQueryStringParser(history.location.search);

  return (
    <RegisterPageWrapper className='RegisterPageWrapper'>
      { token ? (
        <Comp {...{ token, email, expiration, }} />
      ) : <NoTokenErrorMessage />
      }
    </RegisterPageWrapper>
  );
});

const enhance = compose(
  connect(
    (state) => ({
      translations: getCurrentTranslations(state),
    })
  ),
);

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

const initialValidationState = { isValid: true, };

const validateValueForConditions = ({ value, conditions, }) => {
  return conditions.reduce((acc, conditionObj) => {
    return !acc.isValid ?
      acc :
      conditionObj.predicate(value) ? acc : { isValid: false, validationErrorMessage: conditionObj.message , };
  }, initialValidationState);
};

const RegisterFormInputWithValidation = (props) => {

  const {
    validationConditions,
    validateInput = true,
    value,
  } = props;

  const [
    hasBeenFocused,
    setHasBeenFocused,
  ] = React.useState(false);

  const onBlur = () => setHasBeenFocused(true);
  const initialValidationState = { isValid: true, };

  const { validationErrorMessage, } = (hasBeenFocused &&  validateInput) ?
    validateValueForConditions({ value, conditions: validationConditions, }) :
    initialValidationState;
  return (
    <div>
      <RegisterFormLabeledInput {...props } onBlur={onBlur}/>
      {validationErrorMessage ? <ValidationMessage>{validationErrorMessage}</ValidationMessage> : <div style={{ height: 10, paddingBottom: 10, }}></div>}
    </div>
  );
};

const onLoadMoment = Moment().utc();
const Register = RegisterHOC(
  enhance(({
    token,
    email,
    expiration,
    translations,
  }) => {

    const tokenIsExpired = expiration ? Moment.unix(expiration).isBefore(onLoadMoment) : false; // if we don't have the expiration, it's okay
    const [
      expirationDismissed,
      setExpirationDismissed,
    ] = React.useState(false);

    const [
      password,
      onPasswordChange,
    ] = useInputState('');

    const [
      confirmPassword,
      onConfirmPasswordChange,
    ] = useInputState('');

    const [
      termsAccepted,
      setTermsAccepted,
    ] = React.useState(false);

    const [
      privacyPolicyAccepted,
      setPrivacyPolicyAccepted,
    ] = React.useState(false);

    const [
      registerPending,
      setRegisterPending,
    ] = React.useState(false);

    const valueIsSetPredicate = (value) => !!value;

    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z0-9\S]{8,128}$');

    const passwordMeetsStrengthCheck = (value) => strongRegex.test(value);

    const confirmMatchesPasswordPredicate = (value) => value === password;

    const passwordValidationConditions = [
      {
        predicate: valueIsSetPredicate,
        message: translations['Register__empty-password'],
      },
      {
        predicate: passwordMeetsStrengthCheck,
        message: translations['Register__invalid-password'],
      },
    ];

    const confirmPasswordValidationConditions = [
      {
        predicate: valueIsSetPredicate,
        message: translations['Register__empty-confirm-password'],
      },
      {
        predicate: confirmMatchesPasswordPredicate,
        message: translations['Register__passwords-dont-match'],
      },
    ];

    const formValid = (
      validateValueForConditions({ value: password, conditions: passwordValidationConditions, }).isValid &&
      validateValueForConditions({ value: confirmPassword, conditions: confirmPasswordValidationConditions, }).isValid &&
      termsAccepted &&
      privacyPolicyAccepted &&
      !registerPending
    );

    const onFormSubmit = async (e) => {
      e.preventDefault();
      if (!formValid) {
        console.error('Invalid form, should not have allowed post');
        return;
      }
      setRegisterPending(true);
      await AxiosRequestService.post();
    };
    const showExpiration = tokenIsExpired && !expirationDismissed;
    return (
      <div>
        <RegisterForm className='RegisterForm' onSubmit={onFormSubmit}>
          { showExpiration ? (
            <div>
              <ExpiredMessage><Translation translationKey={'Register__expired-message'} /></ExpiredMessage>
              <SubmitButton onClick={() => setExpirationDismissed(true)}>
                <Translation translationKey={'Register__expired-dismiss-button'} />
              </SubmitButton>
            </div>
          ) : (
            <React.Fragment>
              <RegisterFormTitle><Translation translationKey={'Register__title'} /></RegisterFormTitle>
              <RegisterFormHeader>
                {email ?
                  <React.Fragment><Translation translationKey={'Register__email-header-fragment'}/><EmailSpan> {email}</EmailSpan></React.Fragment> :
                  <Translation translationKey={'Register__no-email-header'}/>
                }
              </RegisterFormHeader>
              <div style={{ padding: '10px 0', }}>
                <RegisterFormInputWithValidation
                  value={password}
                  placeholder={translations['Register__password-placeholder']}
                  onChange={onPasswordChange}
                  label={translations['Register__password-label']}
                  validationConditions={passwordValidationConditions}
                  type='password'
                  required
                  disabled={registerPending}
                />
                <RegisterFormInputWithValidation
                  value={confirmPassword}
                  placeholder={translations['Register__confirm-password-placeholder']}
                  onChange={onConfirmPasswordChange}
                  label={translations['Register__confirm-password-label']}
                  validationConditions={confirmPasswordValidationConditions}
                  validateInput={validateValueForConditions({ value: password, conditions: passwordValidationConditions, }).isValid}
                  type='password'
                  required
                  disabled={registerPending}
                />
              </div>
              <div style={{ paddingBottom: 10, fontSize: '0.8rem', }}>
                <div>
                  <input value={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                    type='checkbox'/>
                  <label><Translation translationKey={'Register__i-agree-to'} /> <PolicyLink href={termsOfServiceUrl} target='_blank' rel='noopener noreferrer'><Translation translationKey={'Register__terms-of-service'}/></PolicyLink></label>
                </div>
                <div>
                  <input value={privacyPolicyAccepted}
                    onChange={() => setPrivacyPolicyAccepted(!privacyPolicyAccepted)}
                    type='checkbox'/>
                  <label><Translation translationKey={'Register__i-agree-to'} /> <PolicyLink href={privacyPolicyUrl} target='_blank' rel='noopener noreferrer'><Translation translationKey={'Register__privacy-policy'}/></PolicyLink></label>
                </div>
              </div>
              <SubmitButton
                type='submit'
                disabled={!formValid}
                disabledToolTip={'Form valid issue'}>
                {registerPending ? <SubmitLoadingUI /> : <Translation translationKey={'Register__submit-button'}/>}
              </SubmitButton>
            </React.Fragment>
          )}
        </RegisterForm>
        {!showExpiration && (
          <LoginFooter>
            <Translation translationKey={'Register__login-text'}/> <a href={routerPaths.login}><Translation translationKey={'Register__login-link'} /></a>
          </LoginFooter>
        )}
      </div>
    );
  })
);



export default Register;
