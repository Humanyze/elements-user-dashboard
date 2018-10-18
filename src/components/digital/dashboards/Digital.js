import React from 'react';
import { compose, lifecycle, pure } from 'recompose';
import { connect } from 'react-redux';

import RouterPaths from 'Src/routerPaths';

import './digital.scss';

import DigitalTabRoutes from './digital-tabs/DigitalTabRoutes';

import { setUserTeams } from 'Redux/common/userData/user/userActions';

import DigitalHeaderNav from './digital-header-nav/DigitalHeaderNav';
import MetricFilterBlockCreator from 'Common/metric-filter-block/MetricFilterBlock';
import MetricGroupSelector from 'Common/metric-group-selector/MetricGroupSelector';
import { getSelectedDeploymentId, getSelectedDeploymentName } from 'Src/redux/common/deployment/deploymentReducer';
import FilterRoutes from 'Src/components/digital/dashboards/digital-filter-routes/FilterRoutes';
import ErrorBoundary from 'Src/components/common/error-boundary/ErrorBoundary';
import DigitalGlobalErrorMessage
  from 'Src/components/digital/dashboards/digital-global-error-message/DigitalGlobalErrorMessage';
import DashboardRoutes from 'Src/components/digital/dashboards/DashboardRoutes';
import { withRouter } from 'react-router-dom';
import { setExecutiveDeploymentGroups, setSelectedDeploymentId } from 'Src/redux/common/deployment/deploymentActions';
import ActionSubBar from 'Src/components/common/action-sub-bar/ActionSubBar';

const enhance = compose(
  connect(
    state => ({
      deploymentName: getSelectedDeploymentName(state)
    }),
    { setSelectedDeploymentId, setExecutiveDeploymentGroups }
  ),
  withRouter,
  lifecycle({
    componentDidMount() {
      console.error(this.props);

      const {
        match: {
          params: {
            id
          }
        },
        setSelectedDeploymentId,
        setExecutiveDeploymentGroups
      } = this.props;

      setSelectedDeploymentId(id);
      setExecutiveDeploymentGroups();
    },
  }),
  pure
);

const DigitalFilterBlock = MetricFilterBlockCreator(FilterRoutes);

export const DigitalPure = ({ deploymentName }) => {
  return (
    <div className='Digital'>
      <ActionSubBar deploymentName={deploymentName} deploymentSelectionPath={RouterPaths.selectDeployment}/>
      <ErrorBoundary ErrorMessage={DigitalGlobalErrorMessage}>
        <DigitalHeaderNav/>
        <DigitalTabRoutes/>
        <div className='Digital__grid'>
          <MetricGroupSelector/>
          <div className='Digital__grid-bottom'>
            <DigitalFilterBlock/>
            <DashboardRoutes/>
          </div>
        </div>
      </ErrorBoundary>

    </div>
  );
};

const Digital = connect(
  state => ({
    selectedDeploymentId: getSelectedDeploymentId(state),
  }),
  { setUserTeams }
)(enhance(DigitalPure));

export default Digital;
