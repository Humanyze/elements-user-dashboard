import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { elementsRedux } from 'ElementsWebCommon';

import ExecutiveRoutes from './ExecutiveRoutes';

const {
  errorActions: { addFatalError, },
  errorMessageTypes: { userModuleAccessFailureGenerator, },
  userSelectors: { getCurrentUserPermissions, },
} = elementsRedux;

const enhance = compose(
  connect(
    (state) => ({
      permissions: getCurrentUserPermissions(state),
    }),
    (dispatch) => ({
      showUnauthorizedError: () => dispatch(addFatalError(userModuleAccessFailureGenerator())),
    })
  ),
  lifecycle({
    componentDidMount() {
      if (!this.props.permissions.digital_dashboard) {
        this.props.showUnauthorizedError();
      }
    },
  })
);

const Executive = () => {
  return <ExecutiveRoutes />;
};

export default enhance(Executive);
