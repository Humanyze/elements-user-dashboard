import React, {Component} from 'react';
import {compose, withState, withHandlers} from 'recompose';
import './user-avatar.scss';

class UserAvatar extends Component {
    state = {
        showDropdown: false
    };

    toggleDropdown = () => this.setState((prevState) => ({
        showDropdown: !prevState.showDropdown
    }));

    render = () => (
        <div className='UserAvatar'>
            <div className='UserAvatar__email'>matthew@humanyze.com</div>
            <div className='UserAvatar__dropdown-wrapper'>
                <div className='UserAvatar__image' onClick={this.toggleDropdown}>
                    M
                </div>
                <div className='UserAvatar__dropdown'>
                    {this.state.showDropdown && [1, 2, 3].map((option) => {
                        return <div key={option}>Option</div>;
                    })}
                </div>
            </div>
        </div>
    );
}
export default UserAvatar;

// Recompose way
const enhance = compose(
    withState('showDropdown', 'setShowDropdown', false), 
    withHandlers({
        toggleDropdown: ({showDropdown, setShowDropdown}) => e => setShowDropdown(!showDropdown)
    })
);

const UserAvatarPure = ({showDropdown, toggleDropdown}) => <div className='UserAvatar'>
    <div className='UserAvatar__email'>matthew@humanyze.com</div>
    <div className='UserAvatar__dropdown-wrapper'>
    <div className={`UserAvatar__image ${showDropdown && 'active'}`} onClick={toggleDropdown}>
            M
        </div>

        <div className='UserAvatar__dropdown'>
            {showDropdown && [1, 2, 3].map((option) => {
                return <div key={option}>Option</div>;
            })}
        </div>
    </div>
</div>;

const UserAvatarEnhanced = enhance(UserAvatarPure);

export {UserAvatarEnhanced};
