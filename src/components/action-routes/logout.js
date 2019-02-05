import { connect } from 'react-redux';
import { elementsRedux } from 'elements-web-common';
import { lifecycle, compose } from 'recompose';

const {
    authActions: {
        logoutUser
    }
} = elementsRedux;

const enhance = compose(
    lifecycle({
        componentWillMount() {
            this.props.logout();
        }
    })
);

const LogoutPure = () => {
    return null;
};


const Logout = connect(
    null,
    { logout: logoutUser }
)(enhance(LogoutPure));

export default Logout;


