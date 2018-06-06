import React from 'react';
import { connect } from 'react-redux';

import './deployment-selection.scss';

import { setDeploymentsFromStoreDeploymentIds } from 'Redux/deployment/deploymentActions';
import DeploymentSelectionItem from './deployment-selection-item/DeploymentSelectionItem';
import LoadingUI from 'Common/loading/LoadingUI';
import { getCurrentTranslations } from 'Redux/common/language/languageReducer';
import { compose, lifecycle } from 'recompose';


const deploymentDataRequestNeeded = ({ deploymentDataSetIds, deploymentsById, requestPending }) => {
    if (!requestPending && deploymentDataSetIds) {
        return deploymentDataSetIds.reduce((needsDispatch, id) => {
            if (!deploymentsById[id]) {
                return true;
            }
            return needsDispatch;
        }, false);
    }
    return false;
};


const onPropReceive = (props) => {
    const {
        deploymentData: {
            deploymentDataSetIds,
            deploymentsById,
            requestPending
        },
        setDeploymentsFromStoreDeploymentIds
    } = props;
    deploymentDataRequestNeeded({ deploymentDataSetIds, deploymentsById, requestPending }) &&
    setDeploymentsFromStoreDeploymentIds();

};


const withLifecycle = compose(lifecycle({
    componentWillMount() {
        onPropReceive(this.props);
    },
    componentWillReceiveProps(nextProps) {
        onPropReceive(nextProps);
    }
}));


export const DeploymentSelectionPure = withLifecycle(({ deploymentData, setDeploymentsFromStoreDeploymentIds, translations }) => {
    const { deploymentDataSetIds, deploymentsById, requestPending } = deploymentData;
    return (
        <div className='DeploymentSelection__wrapper'>
            <div className='DeploymentSelection'>
                <div>
                    <div className='DeploymentSelection__header'>{translations.selectDeploymentHeader}</div>
                    <div className='DeploymentSelection__deployment-list'>

                        {!requestPending && deploymentDataSetIds  ?
                            !!deploymentDataSetIds.length ?
                                deploymentDataSetIds.map((id) => {
                                        const deployment = deploymentsById[id];
                                        return !!deployment &&
                                            <DeploymentSelectionItem key={id} deployment={deployment}/>;
                                    }
                                ) : <div className='DeploymentSelection__no-data-message'>You don't have access to any deployments.</div>
                            :
                            <div className='DeploymentSelection__loading-background'>
                                <LoadingUI/>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
});

const DeploymentSelection = connect(
    (state) => ({
        deploymentData: state.deployment,
        translations: getCurrentTranslations(state)
    }),
    { setDeploymentsFromStoreDeploymentIds }
)(DeploymentSelectionPure);

export default DeploymentSelection;
