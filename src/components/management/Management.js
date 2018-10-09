import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';


import './management.scss';

import ManagementRoutes from './ManagementRoutes';
import ManagementTabRoutes from './management-tabs/ManagementTabRoutes';

import { setUserTeams } from 'Redux/common/userData/user/userActions';
import { setUserManagementDeployment } from 'Src/redux/common/deployment/deploymentActions';

import ManagementHeaderNav from './management-header-nav/ManagementHeaderNav';
import ManagementFilterBlockCreator from '../common/metric-filter-block/MetricFilterBlock';
import ManagementGroupSelector from '../common/metric-group-selector/MetricGroupSelector';
import { getSelectedDeploymentId } from 'Src/redux/common/deployment/deploymentReducer';
import { replaceQueryParams } from 'Common/utils/update-query-params';
import FilterRoutes from 'Src/components/management/management-filter-routes/FilterRoutes';
import ErrorBoundary from 'Src/components/common/error-boundary/ErrorBoundary';
import ManagementGlobalErrorMessage
  from 'Src/components/management/management-global-error-message/ManagementGlobalErrorMessage';

const enhance = compose(
  lifecycle({
    componentDidMount() {
      this.props.setUserTeams();
      this.props.setUserManagementDeployment();
    },
    componentDidUpdate(previousProps) {
      const { selectedDeploymentId, history } = this.props;
      const { selectedDeploymentId: previousDeploymentId } = previousProps;

      selectedDeploymentId
      && selectedDeploymentId !== previousDeploymentId
      && replaceQueryParams(history, history.location, { deployment: selectedDeploymentId });
    }
  })
);

const ManagementFilterBlock = ManagementFilterBlockCreator(FilterRoutes);

export const ManagementPure = () => {
  return (
    <div className='Management'>
      <ErrorBoundary ErrorMessage={ManagementGlobalErrorMessage}>

        <ManagementHeaderNav/>
        <ManagementTabRoutes/>
        <div className='Management__grid'>
          <ManagementGroupSelector/>
          <div className='Management__grid-bottom'>
            <ManagementFilterBlock/>
            <ManagementRoutes/>
          </div>
        </div>
      </ErrorBoundary>

    </div>
  );
};

const Management = connect(
  state => ({
    selectedDeploymentId: getSelectedDeploymentId(state),
  }),
  { setUserTeams, setUserManagementDeployment }
)(enhance(ManagementPure));

export default Management;
