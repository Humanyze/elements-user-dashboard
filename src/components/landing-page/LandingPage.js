import React from 'react';
import { elementsReact, assets } from 'ElementsWebCommon';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

const {
  headerHeight,
} = elementsReact;

const {
  metricCardBoxShadow,
  humanyzeBlue,
} = assets;

const LandingPageWrapper = styled.div`
  height: calc(100vh - ${headerHeight});
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WelcomeMessageBlock = styled.div`
  width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: ${metricCardBoxShadow};
  font-size: 25px;
  align-items: center;
  text-align: center;
  color: ${humanyzeBlue};
`;

const MyButton = styled.button`
`;

const LandingPage = () => {
  return (
    <div>
    <LandingPageWrapper>
      <WelcomeMessageBlock>
        Hi Welcome to Humanyze!
       <div>
        <MyButton onClick={() => window.location.href='/logout'}>LOGOUT</MyButton>
        <MyButton onClick={() => window.location.href='/deployments'}>COMPANIES</MyButton>
       </div>
      </WelcomeMessageBlock>

    </LandingPageWrapper>
    </div>
  );
};

export default LandingPage;
