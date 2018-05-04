import React from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import MaterialIcon from 'material-icons-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { compose, withHandlers, withState } from 'recompose';


import { getCurrentTranslations } from 'Src/redux/language/languageReducer';

import './date-selector.scss';

// must be class for ref usage by DatePicker
class CustomInput extends React.Component {
    render() {
        const { translations, value, onClick } = this.props;

        return (
            <div onClick={onClick} className='DateSelector__label-button'>
                {/* NOTE: Don't like dependency on Moment-js here */}
                {value ?
                    <div className='DateSelector__date-text'>{Moment(value._d).format('MMM D, YYYY')}</div> :
                    <div className='DateSelector__select-date-text'>{translations['DateSelector__select-date']}</div>}
                <MaterialIcon icon='event_note' size={18}/>
            </div>
        );
    }
}

export const DateSelectorPure = ({ translations, date, onChange }) => {
    return (
        <div className='DateSelector'>
            <div className='DateSelector__dropdown'>
                <DatePicker onSelect={onChange}
                            selected={date}
                            customInput={<CustomInput translations={translations} value={date}/>}/>
            </div>
        </div>
    );
};


const DateSelector = connect(
    state => ({
        translations: getCurrentTranslations(state),
    }),
)(DateSelectorPure);


export default DateSelector;