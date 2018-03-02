import React, {Component} from 'react';
import {compose, withState, withHandlers} from 'recompose';
import './user-avatar.scss';

const user = {
    username: `matthew@humanyze.com`,
    avatar: `M`
};

class UserAvatar extends Component {
    static propTypes = {};

    state = {
        showDropdown: false
    };

    toggleDropdown = () => this.setState((prevState) => ({
        showDropdown: !prevState.showDropdown
    }));

    render() {
        return (
            <div className='UserAvatar'>
                <div className='UserAvatar__email'>{user.username}</div>
                <div className='UserAvatar__dropdown-wrapper'>
                    <div className='UserAvatar__image' onClick={this.toggleDropdown}>
                        {user.avatar}
                    </div>
                    {this.state.showDropdown && 
                    <div className='UserAvatar__dropdown'>
                        {[1, 2, 3].map((option) => {
                            return <div key={option}>Option</div>;
                        })}
                    </div>
}
                </div>
            </div >
        )
    };
}
export default UserAvatar; // Recompose way 
const enhance = compose(withState('showDropdown', 'setShowDropdown', false), withHandlers({
    toggleDropdown: ({showDropdown, setShowDropdown}) => e => setShowDropdown(!showDropdown)
}));
const UserAvatarPure = ({showDropdown, toggleDropdown}) => <div className='UserAvatar'>
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
export {UserAvatarEnhanced}