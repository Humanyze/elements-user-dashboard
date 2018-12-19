import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { compose } from 'ramda';
import MaterialIcons from 'material-icons-react';
import { getSelectedDeploymentId } from 'Redux/common/deployment/deploymentReducer';
import { getCurrentTranslations } from 'Redux/common/language/languageReducer';

const humanyzeBlue = '#25b3d5';

const StyledBackToEmberLinkWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  padding-right: 10px;
`;

const StyledBackToEmberLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 12px;
  text-transform: uppercase;
  color: ${humanyzeBlue};
  font-weight: bold;
  &:hover {
    .BackToEmberLink__text {
      text-decoration: underline;
    }
  }
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
      <StyledBackToEmberLink href={linkUrl} className='BackToEmberLink__link'>
        <MaterialIcons  icon={'arrow_back'} color={humanyzeBlue} size={14} />
        <span className='BackToEmberLink__text' >{translations['BackToEmberLink__text']}</span>
      </StyledBackToEmberLink>
    </StyledBackToEmberLinkWrapper>
  );
};

export default enhance(BackToEmberLinkPure);
