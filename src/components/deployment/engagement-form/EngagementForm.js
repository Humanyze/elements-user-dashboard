import React from 'react';
import Moment from 'moment';
import Select from 'react-select';

import DateRangeSelector from 'ElementsWebCommon/react/date-range-selector/DateRangeSelector';

import './engagement-form.scss';

const options = [
  { value: 'digital', label: 'Digital', },
  { value: 'badge', label: 'Badge', },
];

class EngagementForm extends React.Component {

  constructor(props) {
    super(props);
    const engagement = props.engagement || {
      name: '',
      start_date: Moment(new Date()).subtract(3, 'month'),
      end_date: Moment(new Date()),
      type: 'digital',
    };

    this.state = {
      ...engagement,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value , });
  }

  handleSubmit = (event) => {
    console.log('Submitted', this.state);
    event.preventDefault();
  }

  handleSelectChange = (selectedOption) => {
    this.setState({ type: selectedOption.value , });
  }

  render() {
    return (
      <div className='engagement-form-wrapper'>
        <h3>Study Overview</h3>
        <form onSubmit={this.handleSubmit}>

          <div className='control'>
            <label htmlFor='name'>Name</label>
            <input name='name' value={this.state.name} onChange={this.handleChange}/>
          </div>

          <div className='control'>
            <label htmlFor='type'>Type</label>
            <Select
              className='reactSelect'
              name='study_type'
              placeholder='Study Type'
              options={options}
              onChange={this.handleSelectChange}
              defaultValue={options.filter(((option) => option.value === this.state.type))}
            />
          </div>

          <div className='control'>
            <label htmlFor='date-range'>Date Range</label>
            <DateRangeSelector
              name='date-range'
              minDate={Moment(new Date()).subtract(1, 'year')}
              maxDate={Moment(new Date())}
              startDate={this.state.start_date }
              endDate={ this.state.end_date }
              onStartDateChange={(value) => { this.setState({ start_date: value , }) ; }}
              onEndDateChange={(value) => { this.setState({ end_date: value , }) ; }}
            />
          </div>

          <div className='next-button'>
            <button type='submit'>Next</button>
          </div>
        </form>
      </div>  );
  }
}

export default EngagementForm;
