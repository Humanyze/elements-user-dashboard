import React from 'react';
import styled from 'styled-components';
import { elementsReact, elementsRedux, assets } from 'ElementsWebCommon';
import { connect } from 'react-redux';
import memoize from 'fast-memoize';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { lighten } from 'polished';
const {
  LabeledInput,
  headerHeight,
  Utils: {
    parse,
  },
} = elementsReact;

const {
  languageSelectors: {
    getCurrentTranslations,
  },
} = elementsRedux;
const {
  metricCardBoxShadow,
  humanyzeBlue,
  lightBorder,
} = assets;

const boxHeight = '40px';

const RegisterPageWrapper = styled.div`
  height: calc(100vh - ${headerHeight});
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterForm = styled.form`
  max-width: 400px;
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

const SubmitButton = styled.button`
  background: ${humanyzeBlue};
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
`;

const ValidationMessage = styled.div`
  height: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  color: red;
  font-size: 0.7rem;
`;

const memoizedQueryStringParser = memoize(parse);

const RegisterHOC = (Comp) => withRouter(({ history, }) => {

  const {
    token,
    email,
    expiration,
  } = memoizedQueryStringParser(history.location.search);

  return <Comp {...{ token, email, expiration, }} />;
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

  const { isValid, validationErrorMessage, } = (hasBeenFocused &&  validateInput) ?
    validateValueForConditions({ value, conditions: validationConditions, }) :
    initialValidationState;
  console.error('inComon', isValid, (hasBeenFocused && validateInput));
  return (
    <div>
      <RegisterFormLabeledInput {...props } onBlur={onBlur}/>
      {validationErrorMessage ? <ValidationMessage>{validationErrorMessage}</ValidationMessage> : <div style={{ height: 10, paddingBottom: 10, }}></div>}
    </div>
  );
};


const Register = RegisterHOC(
  enhance(({
    token, email,
  }) => {
    const [
      password,
      onPasswordChange,
    ] = useInputState('');


    const [
      confirmPassword,
      onConfirmPasswordChange,
    ] = useInputState('');

    const valueIsSetPredicate = (value) => !!value;

    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

    const passwordMeetsStrengthCheck = (value) => console.warn(value) || strongRegex.test(value);

    const confirmMatchesPasswordPredicate = (value) => value === password;

    const passwordValidationConditions = [
      {
        predicate: valueIsSetPredicate,
        message: 'farts',
      },
      {
        predicate: passwordMeetsStrengthCheck,
        message: 'weak boi',
      },
    ];

    const confirmPasswordValidationConditions = [
      {
        predicate: valueIsSetPredicate,
        message: 'farts',
      },
      {
        predicate: confirmMatchesPasswordPredicate,
        message: 'make them match damn it!',
      },
    ];
    console.error('what are we passing',password,  validateValueForConditions({ password, conditions: passwordValidationConditions, }).isValid);
    return (
      <RegisterPageWrapper className='RegisterPageWrapper'>
        <RegisterForm className='RegisterForm'>
          <RegisterFormTitle>Register</RegisterFormTitle>
          <RegisterFormHeader>
            {email ?
              <React.Fragment>Welcome to Humanyze! Please register. The invited email was <EmailSpan>{email}</EmailSpan>)</React.Fragment> :
              <React.Fragment>We don't seem to know which email you were invited from, but you can still try to sign up.</React.Fragment>
            }
          </RegisterFormHeader>
          <div style={{ padding: '10px 0', }}>
            <RegisterFormInputWithValidation
              value={password}
              placeholder={'Password'}
              onChange={onPasswordChange}
              label={'Password'}
              validationConditions={passwordValidationConditions}
            />
            <RegisterFormInputWithValidation
              value={confirmPassword}
              placeholder={'Confirm Password'}
              onChange={onConfirmPasswordChange}
              label={'Confirm Password'}
              validationConditions={confirmPasswordValidationConditions}
              validateInput={validateValueForConditions({ password, conditions: passwordValidationConditions, }).isValid}
            />
          </div>
          <SubmitButton type='submit'>Register</SubmitButton>
        </RegisterForm>
      </RegisterPageWrapper>
    );
  })
);



export default Register;
