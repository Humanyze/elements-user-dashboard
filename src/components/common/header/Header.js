import React from 'react';

import './header.scss';
import UserAvatar from '../user-avatar/UserAvatar';
import logoFull from 'Assets/images/logo-full.png';

const Header = () => {
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