
import React from 'react';
import { storiesOf } from '@storybook/react';
import UserAvatar, { UserAvatarPure } from './UserAvatar';
import { RouterContext, StoreContext, translations } from 'TestUtils/contextCreators';


const defaultProps = {
    username: 'demo@humanyze.com',
    translations: translations,
    dropdownLinks :[
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
            textKey: 'avatarMenu/profile',
            to: '/profile'
        },
        {
            textKey: 'avatarMenu/changePassword',
            to: '/profile/change-password'
        }
    ]

};

const createComp = (props) => <StoreContext><RouterContext><UserAvatarPure {...defaultProps} {...props}/></RouterContext></StoreContext>;

storiesOf('UserAvatar', module)
    .add('initial', () => createComp())
    .add('dropdown showing', () => (
        createComp({ showDropdown: true })
    ));