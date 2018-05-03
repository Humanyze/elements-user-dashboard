import React from 'react';
import { connect } from 'react-redux';
import MaterialIcon from 'material-icons-react';

import { getCurrentTranslations } from 'Src/redux/language/languageReducer';

import './date-selector.scss';

const DateSelectorPure = ({ translations }) => {
    return (
        <div className='DateSelector'>
            <div>{translations['DateSelector__select-date']}</div>
            <MaterialIcon icon='event_note' size={18}/>
        </div>
    );
};


const DateSelector = connect(
    state => ({
        translations: getCurrentTranslations(state),
    }),
)(DateSelectorPure);



export default DateSelector;