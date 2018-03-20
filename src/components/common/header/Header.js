import React from 'react';

import './header.scss';
import RouterPaths from 'RouterPaths';
import UserAvatar from '../user-avatar/UserAvatar';

const Header = () => {
    const { basePath } = RouterPaths;
    return (
        <div className='Header'>
            <div className='Header__logo-wrapper'>
                <div className='Header__logo'>
                    <img src={`${!basePath && '/'}${basePath}${!basePath && '/'}images/logo-full.png`} alt='humanyze logo'/>
                </div>
            </div>
            <UserAvatar />
        </div>
    );
};

export default Header;