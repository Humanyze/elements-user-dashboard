import React from 'react';

import './header.scss';

import UserAvatar, {UserAvatarEnhanced} from '../user-avatar/UserAvatar';

const HeaderPure = () => {
    return (
        <div className='Header'>
            <div className='Header__logo-wrapper'>
                <div className='Header__logo'>
                    <img src='/images/logo-full.png' alt='humanyze logo'/>
                </div>
            </div>
            <UserAvatarEnhanced />
        </div>
    )
};

const Header = HeaderPure;

export default Header;