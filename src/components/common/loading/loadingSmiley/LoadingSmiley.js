import React from 'react';

import './loading-smiley.scss';


const LoadingSmiley = ({ theme }) => (
    <div className={`loadingSmiley ${theme}`}>
        <div className='leftEye'/>
        <div className='rightEye'/>
        <div className='mouth'/>
    </div>
);

export default LoadingSmiley;