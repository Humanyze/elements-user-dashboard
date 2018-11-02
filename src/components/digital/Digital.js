import React from 'react';
import DigitalRoutes from 'Src/components/digital/DigitalRoutes';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { getCurrentUserPermissions } from 'Src/redux/common/userData/user/userReducer';
import { addFatalError } from 'Src/redux/common/error/errorActions';
import { userModuleAccessFailureGenerator } from 'Src/redux/common/error/errorMessageTypes';

const enhance = compose(
  connect(
    state => ({
      permissions: getCurrentUserPermissions(state)
    }),
    dispatch => ({
      showUnauthorizedError: () => dispatch(addFatalError(userModuleAccessFailureGenerator()))
    })
  ),
  lifecycle({
    componentDidMount() {
      if (!this.props.permissions.digital_dashboard) {
        this.props.showUnauthorizedError();
      }
    }
  })
);

const Digital = () => {
  return (
    <DigitalRoutes/>
  );
};

export default enhance(Digital);