import { connect } from 'react-redux';
import { logoutUser } from 'Src/redux/common/auth/authActions';
import { lifecycle, compose } from 'recompose';


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


