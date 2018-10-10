import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';


import './digital.scss';

import DigitalTabRoutes from './digital-tabs/DigitalTabRoutes';

import { setUserTeams } from 'Redux/common/userData/user/userActions';
// todo: weird logic for this going on
// import { setUserDigitalDeployment } from 'Src/redux/common/deployment/deploymentActions';

import DigitalHeaderNav from './digital-header-nav/DigitalHeaderNav';
import DigitalFilterBlockCreator from 'Common/metric-filter-block/MetricFilterBlock';
import MetricGroupSelector from 'Common/metric-group-selector/MetricGroupSelector';
import { getSelectedDeploymentId } from 'Src/redux/common/deployment/deploymentReducer';
import { replaceQueryParams } from 'Common/utils/update-query-params';
import FilterRoutes from 'Src/components/digital/dashboards/digital-filter-routes/FilterRoutes';
import ErrorBoundary from 'Src/components/common/error-boundary/ErrorBoundary';
import DigitalGlobalErrorMessage
  from 'Src/components/digital/dashboards/digital-global-error-message/DigitalGlobalErrorMessage';
import DashboardRoutes from 'Src/components/digital/dashboards/DashboardRoutes';

const enhance = compose(
  lifecycle({
    componentDidMount() {
      this.props.setUserTeams();
//      this.props.setUserDigitalDeployment();
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

const DigitalFilterBlock = DigitalFilterBlockCreator(FilterRoutes);

export const DigitalPure = () => {
  return (
    <div className='Digital'>
      <ErrorBoundary ErrorMessage={DigitalGlobalErrorMessage}>

        <DigitalHeaderNav/>
        <DigitalTabRoutes/>
        <div className='Digital__grid'>
          <MetricGroupSelector/>
          <div className='Digital__grid-bottom'>
            <DigitalFilterBlock/>
            <DashboardRoutes />
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
