import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import './user-avatar.scss';
import packageJson from 'appPackageJson';
import { connect } from 'react-redux';
import { logout } from 'Redux/auth/authActions';
import { Link } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import { getCurrentUserName } from 'Redux/userData/user/userReducer';
import { getCurrentParticipantAvatar } from 'Redux/userData/participant/participantReducer';
import { getCurrentTranslations } from 'Src/redux/language/languageReducer';

const onLogoutClicked = ({ setShowDropdown, logout }) => e => {
    logout();
    setShowDropdown(false);
};

const linkClicked = ({ setShowDropdown }) => e => {
    setShowDropdown(false);
};

const enhance = compose(
    withState('showDropdown', 'setShowDropdown', false),
    withHandlers({
        toggleDropdown: ({ showDropdown, setShowDropdown }) => e => setShowDropdown(!showDropdown),
        onLogoutClicked,
        linkClicked
    })
);


export const UserAvatarPure = ({ username, avatar, showDropdown, toggleDropdown, onLogoutClicked, linkClicked, translations }) => (
    <div className='UserAvatar'>
        <div className='UserAvatar__email'>
            {username}
        </div>
        <div className='UserAvatar__dropdown-wrapper'>
            <div onClick={toggleDropdown} className='UserAvatar__avatar-icon'>
                {avatar ? <MaterialIcon icon='account_circle' size={45}/> :
                    <MaterialIcon icon='account_circle' size={45}/>}
            </div>

            {showDropdown &&
            <div className='UserAvatar__dropdown'>
                <div className='UserAvatar__dropdown-body'>
                    {DropdownLinks.map(link => <a href={link.to}
                                                     key={link.textKey}>
                        {translations[link.textKey]}
                    </a>)}
                    <div className='UserAvatar__dropdown-divider'/>
                    <Link to={'never'} onClick={onLogoutClicked}>Logout</Link>
                    <div className='UserAvatar__dropdown-version-text'>Elements { packageJson.version }</div>
                </div>
            </div>
            }
        </div>
    </div>
);

const UserAvatar = connect(
    (state) => ({
        username: getCurrentUserName(state),
        avatar  : getCurrentParticipantAvatar(state),
        translations: getCurrentTranslations(state)

    }),
    { logout }
)(enhance(UserAvatarPure));
export default UserAvatar;


const DropdownLinks = [
    {
        textKey: 'avatarMenu/dashboard',
        to  : '/dashboard'
    },
    {
        textKey: 'avatarMenu/management',
        to  : '/manage'
    },
    {
        textKey: 'avatarMenu/executive',
        to  : '/select-deployment?for=executive'
    },
    {
        textKey: 'avatarMenu/digital',
        to  : '/select-deployment?for=digital'
    },
    {
        textKey: 'avatarMenu/profile',
        to  : '/profile'
    },
    {
        textKey: 'avatarMenu/changePassword',
        to  : '/profile/change-password'
    }
];