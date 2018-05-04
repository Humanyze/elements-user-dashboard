import React from 'react';
import { connect } from 'react-redux';
import MaterialIcon from 'material-icons-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import { getCurrentTranslations } from 'Src/redux/language/languageReducer';

import './date-selector.scss';

// must be class for ref usage by DatePicker
class DateToggleButton extends React.Component {

    handleClick = () => {
        const { container } = this.props;
        const open = container.datepicker.state.open;
        open ? container.datepicker.setOpen(false) : this.props.onClick();
    };

    render() {
        const { translations, value } = this.props;

        return (
            <div onClick={this.handleClick} className='DateSelector__label-button react-datepicker-ignore-onclickoutside'>

                {!!value ?
                    <div className='DateSelector__date-text'>{value}</div> :
                    <div className='DateSelector__select-date-text'>{translations['DateSelector__select-date']}</div>
                }

                <MaterialIcon icon='event_note' size={18}/>
            </div>
        );
    }
}

export class DateSelectorPure extends React.Component {
    // For toggle behavior, customInput needs ref, and both need to be class components
    constructor() {
        super();
        this.datepicker = { state: { open: false } };
    }

    render() {
        const { translations, date, onChange } = this.props;
        return (
            <div className='DateSelector'>
                <div className='DateSelector__dropdown'>
                    <DatePicker onSelect={onChange}
                                selected={date}
                                dateFormat={'MMM D, YYYY'}
                                useWeekdaysShort={true}
                                ref={datepicker => this.datepicker = datepicker}
                                customInput={<DateToggleButton translations={translations} container={this}/>}/>
                </div>
            </div>
        );
    };
}


const DateSelector = connect(
    state => ({
        translations: getCurrentTranslations(state),
    }),
)(DateSelectorPure);


export default DateSelector;