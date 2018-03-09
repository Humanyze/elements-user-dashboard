
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { UserAvatarPure } from './UserAvatar';
import { RouterContext } from '../../../../.storybook/contextWrappers';

storiesOf('UserAvatar', module)
    .add('initial', () => (
        <UserAvatarPure />
    ))
    .add('dropdown showing', () => (
        <RouterContext><UserAvatarPure showDropdown={true}/></RouterContext>
    ));
