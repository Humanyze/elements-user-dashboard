import React from 'react';

import './header.scss';
import RouterPaths from 'RouterPaths';
import UserAvatar from '../user-avatar/UserAvatar';
import logoFull from 'Public/images/logo-full.png';

const Header = () => {
    const { basePath } = RouterPaths;
    return (
        <div className='Header'>
            <div className='Header__logo-wrapper'>
                <div className='Header__logo'>
                    <img src={logoFull} alt='humanyze logo'/>
                </div>
            </div>
            <UserAvatar />
        </div>
    );
};

export default Header;