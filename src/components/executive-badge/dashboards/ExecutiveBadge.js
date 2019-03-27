import React, { Fragment } from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import './executive.scss';

import ExecutiveTabRoutes from './executive-tabs/ExecutiveTabRoutes';
import ExecutiveHeaderNav from './executive-header-nav/ExecutiveHeaderNav';
import FilterRoutes from './executive-filter-routes/FilterRoutes';
import DashboardRoutes from './DashboardRoutes';

import { elementsReact, elementsRedux, routerPaths as RouterPaths } from 'ElementsWebCommon';
import MetricSidebar from '../../../elements-web-common/react/metric-sidebar/MetricSidebar';

const {
  LoadingUI,
  ErrorBoundary,
  MetricDateSelectorBlock ,
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
      <ErrorBoundary ErrorMessage={DashboardGlobalErrorMessage}>
        {deploymentName ? (
          <Fragment>
            <ExecutiveHeaderNav deploymentName={deploymentName} deploymentSelectionPath={RouterPaths.selectDeployment}/>
            <div className='Management__grid'>
              <MetricSidebar />
              <div className='Management__grid-right'>
                <MetricDateSelectorBlock/>
                <ExecutiveTabRoutes/>
                <div className='Management__chart-wrapper'>
                  <ExecutiveFilterBlock/>
                  <DashboardRoutes />
                </div>
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
