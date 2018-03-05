import React from 'react';
import './light-box-wrapper.scss';

const LightBoxWrapper = ({children}) => {
    return (
        <div className='LightBoxWrapper'>
            <div className='LightBox'>
                {children}
            </div>
        </div>
    )
};

export default LightBoxWrapper;


