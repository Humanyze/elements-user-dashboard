import React from 'react';
import { elementsReact, elementsRedux, assets, routerPaths } from 'ElementsWebCommon';
import styled from 'styled-components';

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

const LandingPage = () => {
  return (
    <div>
    <LandingPageWrapper>
      <WelcomeMessageBlock>
        Hi Welcome to Humanyze!
      </WelcomeMessageBlock>
    </LandingPageWrapper>
    </div>
  );
};


export default LandingPage;
