import React from 'react';
import { compose, withHandlers, withProps, withState } from 'recompose';
import './user-avatar.scss';
import packageJson from 'appPackageJson';
import { connect } from 'react-redux';
import { logoutUser } from 'Redux/auth/authActions';
import { Link } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import { getCurrentUserName } from 'Redux/userData/user/userReducer';
import { getCurrentParticipantAvatar } from 'Redux/userData/participant/participantReducer';
import { getCurrentTranslations } from 'Src/redux/language/languageReducer';

// I royally hate this API style, since you have to name it handleClickOutside for the handler
import onClickOutside from 'react-onclickoutside';


const DropdownLinks = [
    {
        textKey: 'avatarMenu/dashboard',
        to: '/dashboard'
    },
    {
        textKey: 'avatarMenu/management',
        to: '/manage'
    },
    {
        textKey: 'avatarMenu/executive',
        to: '/select-deployment?for=executive'
    },
    {
        textKey: 'avatarMenu/digital',
        to: '/select-deployment?for=digital'
    },
    {
        textKey: 'avatarMenu/deployments',
        to: '/deployments'
    },
    {
        textKey: 'avatarMenu/profile',
        to: '/profile'
    },
    {
        textKey: 'avatarMenu/changePassword',
        to: '/profile/change-password'
    }
];


const onLogoutClicked = ({ setShowDropdown, logoutUser }) => e => {
    logoutUser();
    setShowDropdown(false);
};

const linkClicked = ({ setShowDropdown }) => e => {
    setShowDropdown(false);
};

const enhance = compose(
    withProps(() => ({ dropdownLinks: DropdownLinks })),
    withState('showDropdown', 'setShowDropdown', false),
    withHandlers({
        toggleDropdown: ({ showDropdown, setShowDropdown }) => e => setShowDropdown(!showDropdown),
        onLogoutClicked,
        linkClicked,
        handleClickOutside: ({ setShowDropdown }) => e => setShowDropdown(false)
    }),
    onClickOutside
);

// NOTE: must be class to use click outside
export class UserAvatarPure extends React.Component {

    render() {
        const { username, avatar, dropdownLinks, showDropdown, toggleDropdown, onLogoutClicked, translations } = this.props;
            return (
            <div className='UserAvatar'>
                <span className='UserAvatar__username'>
                    {username}
                </span>
                <div className='UserAvatar__dropdown-wrapper'>
                    <div onClick={toggleDropdown} className='UserAvatar__avatar-icon'>
                        {avatar ? <MaterialIcon icon='account_circle' size={45}/> :
                            <MaterialIcon icon='account_circle' size={45}/>}
                    </div>

                    {showDropdown &&
                    <div className='UserAvatar__dropdown'>
                        <div className='UserAvatar__dropdown-body'>

                            {dropdownLinks.map(link => <a href={link.to}
                                                          className='UserAvatar__dropdown-link'
                                                          key={link.textKey}>{translations[link.textKey]}</a>)}

                            <div className='UserAvatar__dropdown-divider'/>

                            <Link to={'logout'}
                                  onClick={onLogoutClicked}
                                  className='UserAvatar__dropdown-link'>
                                {translations['avatarMenu/logout']}
                            </Link>
                            <div className='UserAvatar__dropdown-version-text'>
                                {translations['avatarMenu/Elements']} v{packageJson.version}
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

const UserAvatar = connect(
    (state) => ({
        username: getCurrentUserName(state),
        avatar: getCurrentParticipantAvatar(state),
        translations: getCurrentTranslations(state)

    }),
    { logoutUser }
)(enhance(onClickOutside(UserAvatarPure)));

export default UserAvatar;




