import React, { Fragment } from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import './executive.scss';

import ExecutiveTabRoutes from './executive-tabs/ExecutiveTabRoutes';
import ExecutiveHeaderNav from './executive-header-nav/ExecutiveHeaderNav';
import FilterRoutes from './executive-filter-routes/FilterRoutes';
import DashboardRoutes from './DashboardRoutes';

import { elementsReact, elementsRedux, routerPaths as RouterPaths } from 'ElementsWebCommon';

const {
  LoadingUI,
  ActionSubBar,
  ErrorBoundary,
  MetricGroupSelector,
  MetricFilterBlockCreator,
  DashboardGlobalErrorMessage,
} = elementsReact;

const {
  routeActions: { digitalDashboardLeft, },
  deploymentActions: { setExecutiveGroups, setSelectedDeploymentById, },
  deploymentSelectors: { getSelectedDeploymentName, },
} = elementsRedux;

const enhance = compose(
  connect(
    (state) => ({
      deploymentName: getSelectedDeploymentName(state),
    }),
    { setSelectedDeploymentById, setExecutiveGroups, digitalDashboardLeft, }
  ),
  lifecycle({
    async componentDidMount() {
      const {
        match: {
          params: { id, },
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

const ExecutiveFilterBlock = MetricFilterBlockCreator(FilterRoutes);

export const DigitalPure = ({ deploymentName, }) => {
  return (
    <div className='Digital'>
      <ActionSubBar deploymentName={deploymentName} deploymentSelectionPath={RouterPaths.selectDeployment} />
      <ErrorBoundary ErrorMessage={DashboardGlobalErrorMessage}>
        {deploymentName ? (
          <Fragment>
            <ExecutiveHeaderNav />
            <ExecutiveTabRoutes />
            <div className='Digital__grid'>
              <MetricGroupSelector />
              <div className='Digital__grid-bottom'>
                <ExecutiveFilterBlock />
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
