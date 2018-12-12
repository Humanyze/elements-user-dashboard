import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { getSelectedDeploymentId } from 'Redux/common/deployment/deploymentReducer';
import { getCurrentTranslations } from '../../../../../redux/common/language/languageReducer';
import './back-to-ember-link.scss';

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
        <div className={'BackToEmberLink__wrapper'}>
            <a href={linkUrl}>
                {translations['BackToEmberLink__text']}
            </a>
        </div>
    );
};

export default enhance(BackToEmberLinkPure);