
import React from 'react';
import { storiesOf } from '@storybook/react';
import { UserAvatarPure } from './UserAvatar';
import { RouterContext } from '../../../../.storybook/contextWrappers';


const defaultProps = {
    username: 'demo@humanyze.com'
};


const createComp = (props) => <RouterContext><UserAvatarPure {...defaultProps} {...props}/></RouterContext>;

storiesOf('UserAvatar', module)
    .add('initial', () => createComp())
    .add('dropdown showing', () => (
        createComp({ showDropdown: true })
    ));
