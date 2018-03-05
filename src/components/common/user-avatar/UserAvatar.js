import React from 'react';
import {compose, withHandlers, withState} from 'recompose';
import './user-avatar.scss';

const user = {
    username: `matthew@humanyze.com`,
    avatar: `M`
};

const enhance = compose(
    withState('showDropdown', 'setShowDropdown', false),
    withHandlers({
        toggleDropdown: ({showDropdown, setShowDropdown}) => e => setShowDropdown(!showDropdown)
    })
);

export const UserAvatarPure = ({showDropdown, toggleDropdown}) =>
    <div className='UserAvatar'>
        <div className='UserAvatar__email'>{user.username}</div>
        <div className='UserAvatar__dropdown-wrapper'>
            <div
                className={`UserAvatar__image ${showDropdown && 'active'}`}
                onClick={toggleDropdown}>
                {user.avatar}
            </div>

            <div className='UserAvatar__dropdown'>
                {showDropdown && [1, 2, 3].map((option) => {
                    return <div key={option}>Option</div>;
                })}
            </div>
        </div>
    </div>;

const UserAvatarEnhanced = enhance(UserAvatarPure);
export default UserAvatarEnhanced;