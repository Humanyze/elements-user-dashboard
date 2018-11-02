import React, { Fragment } from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import RouterPaths from 'Src/routerPaths';

import './digital.scss';

import DigitalTabRoutes from './digital-tabs/DigitalTabRoutes';


import DigitalHeaderNav from './digital-header-nav/DigitalHeaderNav';
import MetricFilterBlockCreator from 'Common/metric-filter-block/MetricFilterBlock';
import MetricGroupSelector from 'Common/metric-group-selector/MetricGroupSelector';
import { getSelectedDeploymentName } from 'Src/redux/common/deployment/deploymentReducer';
import FilterRoutes from 'Src/components/digital/dashboards/digital-filter-routes/FilterRoutes';
import ErrorBoundary from 'Src/components/common/error-boundary/ErrorBoundary';
import DigitalGlobalErrorMessage
  from 'Src/components/digital/dashboards/digital-global-error-message/DigitalGlobalErrorMessage';
import DashboardRoutes from 'Src/components/digital/dashboards/DashboardRoutes';
import {
  setExecutiveDeploymentGroups,
  setSelectedDeploymentById,
} from 'Src/redux/common/deployment/deploymentActions';
import { digitalDashboardLeft } from 'Src/redux/common/route-actions/routeActions';
import ActionSubBar from 'Src/components/common/action-sub-bar/ActionSubBar';
import LoadingUI from 'Src/components/common/loading/LoadingUI';

const enhance = compose(
  connect(
    state => ({
      deploymentName: getSelectedDeploymentName(state)
    }),
    { setSelectedDeploymentById, setExecutiveDeploymentGroups, digitalDashboardLeft }
  ),
  lifecycle({
    async componentDidMount() {

      const {
        match: {
          params: {
            id
          }
        },
        setSelectedDeploymentById,
        setExecutiveDeploymentGroups
      } = this.props;

      await setSelectedDeploymentById(id, `${RouterPaths.basePath}${RouterPaths.selectDeployment}`);
      setExecutiveDeploymentGroups();
    },
    componentWillUnmount() {
      this.props.digitalDashboardLeft();
    }
  }),
);

const DigitalFilterBlock = MetricFilterBlockCreator(FilterRoutes);

export const DigitalPure = ({ deploymentName }) => {
  return (
    <div className='Digital'>
      <ActionSubBar deploymentName={deploymentName} deploymentSelectionPath={RouterPaths.selectDeployment}/>
      <ErrorBoundary ErrorMessage={DigitalGlobalErrorMessage}>
        {deploymentName ?
          (
            <Fragment>
              <DigitalHeaderNav/>
              <DigitalTabRoutes/>
              <div className='Digital__grid'>
                <MetricGroupSelector/>
                <div className='Digital__grid-bottom'>
                  <DigitalFilterBlock/>
                  <DashboardRoutes/>
                </div>
              </div>
            </Fragment>
          )
          :
          <LoadingUI/>
        }
      </ErrorBoundary>

    </div>
  );
};

const Digital = enhance(DigitalPure);

export default Digital;
