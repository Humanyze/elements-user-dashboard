
import React from 'react';
import { storiesOf } from '@storybook/react';
import UserAvatar, { UserAvatarPure } from './UserAvatar';
import { RouterContext, StoreContext, translations } from 'TestUtils/contextCreators';


const defaultProps = {
    username: 'demo@humanyze.com',
    translations: translations
};

const createComp = (props) => <RouterContext><UserAvatarPure {...defaultProps} {...props}/></RouterContext>;

storiesOf('UserAvatar', module)
    .add('initial', () => createComp())
    .add('dropdown showing', () => (
        createComp({ showDropdown: true })
    ));