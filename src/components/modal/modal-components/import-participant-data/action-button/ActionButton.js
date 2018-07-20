import React from 'react';
import classNames from 'classnames';

import './action-button.scss';


const ActionButton = ({ text, onClick, disabled = '', theme = '' }) => {
    return (
        <div className={classNames(`ActionButton ${theme}`, { 'disabled': disabled })}
             onClick={onClick}>
            {text}
        </div>
    );
};

export default ActionButton;