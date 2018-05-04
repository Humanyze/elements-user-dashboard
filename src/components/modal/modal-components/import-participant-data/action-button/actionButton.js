import React from 'react';
import classNames from 'classnames';

import './action-button.scss';


const ActionButton = ({ text, handler, disabled = '', theme = '' }) => {
    return (
        <div className={classNames(`ActionButton ${theme}`, { 'disabled': disabled })}
             onClick={() => console.log('text')}>
            {text}
        </div>
    );
};

export default ActionButton;