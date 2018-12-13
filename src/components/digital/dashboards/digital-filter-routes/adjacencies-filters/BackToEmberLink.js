import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { compose } from 'ramda';
import { getSelectedDeploymentId } from 'Redux/common/deployment/deploymentReducer';
import { getCurrentTranslations } from 'Redux/common/language/languageReducer';

const StyledBackToEmberLinkWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 14px;
  padding-right: 10px;
`;

const enhance = compose(
  connect(
    state => ({
      translations: getCurrentTranslations(state),
      datasetId: getSelectedDeploymentId(state)
    })
  )
);

const BackToEmberLinkPure = ({ translations, datasetId }) => {
  const linkUrl = `/digital/dcoll_top/dcoll_team_adjacencies?dataset=${datasetId}`;
  return (
    <StyledBackToEmberLinkWrapper className='BackToEmberLink__wrapper'>
      <a href={linkUrl}>
        {translations['BackToEmberLink__text']}
      </a>
    </StyledBackToEmberLinkWrapper>
  );
};

export default enhance(BackToEmberLinkPure);
