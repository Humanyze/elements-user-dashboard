import React from 'react';
import DigitalRoutes from 'Src/components/digital/DigitalRoutes';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { elementsRedux } from 'elements-web-common';

const {
  errorActions: { addFatalError },
  errorMessageTypes: { userModuleAccessFailureGenerator },
  userSelectors: { getCurrentUserPermissions },
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

const Digital = () => {
  return <DigitalRoutes />;
};

export default enhance(Digital);
