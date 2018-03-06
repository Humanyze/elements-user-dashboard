import React from 'react';
import {compose, withHandlers, withState} from 'recompose';
import './user-avatar.scss';
import {connect} from "react-redux";
import { logout } from "Redux/auth/authActions";

const user = {
    username: `matthew@humanyze.com`,
    avatar: `M`
};


const onLogoutClicked = ({setShowDropdown, logout}) => e => {
   logout();
   setShowDropdown(false);
};
const enhance = compose(
    withState('showDropdown', 'setShowDropdown', false),
    withHandlers({
        toggleDropdown: ({showDropdown, setShowDropdown}) => e => setShowDropdown(!showDropdown),
        onLogoutClicked
    })
);

export const UserAvatarPure = ({showDropdown, toggleDropdown, onLogoutClicked }) =>
    <div className='UserAvatar'>
        <div className='UserAvatar__email'>{user.username}</div>
        <div className='UserAvatar__dropdown-wrapper'>
            <div
                className={`UserAvatar__image ${showDropdown && 'active'}`}
                onClick={toggleDropdown}>
                {user.avatar}
            </div>

            <div className='UserAvatar__dropdown'>
                {showDropdown && [1].map((option) => {
                    return <div key={option} onClick={onLogoutClicked}>Logout</div>;
                })}
            </div>
        </div>
    </div>;

const UserAvatarEnhanced = connect(
    null,
    {logout}
)(enhance(UserAvatarPure));
export default UserAvatarEnhanced;