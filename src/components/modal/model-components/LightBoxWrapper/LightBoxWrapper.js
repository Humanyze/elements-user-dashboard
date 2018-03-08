import React from 'react';
import './light-box-wrapper.scss';
import {connect} from "react-redux";
import {modalClickedOutside} from "Redux/modal/modalActions";
import {compose, withHandlers} from "recompose";


const enhance = compose(
    withHandlers({
        onClickElsewhere: ({modalClickedOutside}) => e => modalClickedOutside()
    })
);
const LightBoxWrapperPure = ({children, onClickElsewhere}) => {
    return (
        <div className='LightBoxWrapper' onClick={onClickElsewhere}>
            <div className='LightBox'>
                <div onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    )
};

const LightBoxWrapper = connect(
    null,
    {modalClickedOutside}
)(enhance(LightBoxWrapperPure));

export default LightBoxWrapper;


