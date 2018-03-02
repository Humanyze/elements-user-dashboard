import React from 'react';
import './action-sub-bar.scss';

const group = 'Humanyze internal';

const ActionSubBarPure = () => (
    <div className='ActionSubBar'>
        <div className='ActionSubBar__text'>
            Viewing Data For: {group}
        </div>
        <div className='ActionSubBar__text'>
            Change Deployment
        </div>
        <div/>
        <div className='ActionSubBar__text'>
            Import
        </div>
        <div className='ActionSubBar__text'>
            Export
        </div>
    </div>
);

export default ActionSubBarPure;