import React, { Fragment } from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import RouterPaths from 'Src/routerPaths';

import './digital.scss';

import DigitalTabRoutes from './digital-tabs/DigitalTabRoutes';

import DigitalHeaderNav from './digital-header-nav/DigitalHeaderNav';
import FilterRoutes from 'Src/components/digital/dashboards/digital-filter-routes/FilterRoutes';
import DigitalGlobalErrorMessage from 'Src/components/digital/dashboards/digital-global-error-message/DigitalGlobalErrorMessage';
import DashboardRoutes from 'Src/components/digital/dashboards/DashboardRoutes';

import { elementsReact, elementsRedux } from 'ElementstWebCommon';

const { LoadingUI, ActionSubBar, ErrorBoundary, MetricGroupSelector, MetricFilterBlockCreator } = elementsReact;

const {
  routeActions: { digitalDashboardLeft },
  deploymentActions: { setExecutiveGroups, setSelectedDeploymentById },
  deploymentSelectors: { getSelectedDeploymentName },
} = elementsRedux;

const enhance = compose(
  connect(
    (state) => ({
      deploymentName: getSelectedDeploymentName(state),
    }),
    { setSelectedDeploymentById, setExecutiveGroups, digitalDashboardLeft }
  ),
  lifecycle({
    async componentDidMount() {
      const {
        match: {
          params: { id },
        },
        setSelectedDeploymentById,
        setExecutiveGroups,
      } = this.props;

      await setSelectedDeploymentById(id, `${RouterPaths.basePath}${RouterPaths.selectDeployment}`);
      setExecutiveGroups();
    },
    componentWillUnmount() {
      this.props.digitalDashboardLeft();
    },
  })
);

const DigitalFilterBlock = MetricFilterBlockCreator(FilterRoutes);

export const DigitalPure = ({ deploymentName }) => {
  return (
    <div className='Digital'>
      <ActionSubBar deploymentName={deploymentName} deploymentSelectionPath={RouterPaths.selectDeployment} />
      <ErrorBoundary ErrorMessage={DigitalGlobalErrorMessage}>
        {deploymentName ? (
          <Fragment>
            <DigitalHeaderNav />
            <DigitalTabRoutes />
            <div className='Digital__grid'>
              <MetricGroupSelector />
              <div className='Digital__grid-bottom'>
                <DigitalFilterBlock />
                <DashboardRoutes />
              </div>
            </div>
          </Fragment>
        ) : (
          <LoadingUI />
        )}
      </ErrorBoundary>
    </div>
  );
};

const Digital = enhance(DigitalPure);

export default Digital;
