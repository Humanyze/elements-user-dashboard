import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import './user-avatar.scss';
import { connect } from 'react-redux';
import { logout } from 'Redux/auth/authActions';
import { Link } from 'react-router-dom';

const onLogoutClicked = ({ setShowDropdown, logout }) => e => {
    logout();
    setShowDropdown(false);
};
const enhance = compose(
    withState('showDropdown', 'setShowDropdown', false),
    withHandlers({
        toggleDropdown: ({ showDropdown, setShowDropdown }) => e => setShowDropdown(!showDropdown),
        onLogoutClicked
    })
);


export const UserAvatarPure = ({ username, avatar, showDropdown, toggleDropdown, onLogoutClicked }) => (
    <div className='UserAvatar'>
        <div className='UserAvatar__email'>
            {username}
        </div>
        <div className='UserAvatar__dropdown-wrapper'>
            <div className={`UserAvatar__image ${showDropdown && 'active'}`}
                 onClick={toggleDropdown}>
                M
            </div>

            {showDropdown &&
            <div className='UserAvatar__dropdown'>
                <div className='UserAvatar__dropdown-body'>
                    {DropdownLinks.map(link => <Link to={link.to} key={link.text}>{link.text}</Link>)}
                    <div className='UserAvatar__dropdown-divider'/>
                    <Link to={'never'} onClick={onLogoutClicked}>Logout</Link>
                    <div className='UserAvatar__dropdown-version-text'>Elements v2.7.1</div>
                </div>
            </div>
            }
        </div>
    </div>
);

const UserAvatar = connect(
    (state) => ({
        username: state.user.user.user && state.user.user.user.username,
        avatar: state.user.participant.avatar
    }),
    { logout }
)(enhance(UserAvatarPure));
export default UserAvatar;




const DropdownLinks = [
    {
        text: 'Dashboard',
        to: '/dashboard'
    },
    {
        text: 'Management',
        to: '/manage'
    },
    {
        text: 'Executive',
        to: '/select-deployment?for=executive'
    },
    {
        text: 'Digital',
        to: '/select-deployment?for=digital'
    },
    {
        text: 'Profile',
        to: '/profile'
    },
    {
        text: 'Change Password',
        to: '/profile/change-password'
    }
];