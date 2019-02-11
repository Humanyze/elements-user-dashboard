import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';

import { elementsRedux } from 'ElementsWebCommon';

const {
  languageSelectors: {
    getCurrentTranslations,
  },
} = elementsRedux;

const enhance = compose(
  connect(
    (state) => ({ translations: getCurrentTranslations(state), })
  )
);

const ErrorWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MessageText = styled.div.attrs({
  className: 'NoDataMessage__text',
})`
    color: #cccccc;
    font-size: 20px;
`;

const MetricChartErrorMessage = ({ translations, }) => {
  return (
    <ErrorWrapper>
      <MessageText>{translations['ManagementDashboardErrorMessage']}</MessageText>
    </ErrorWrapper>
  );
};

export default enhance(MetricChartErrorMessage);

