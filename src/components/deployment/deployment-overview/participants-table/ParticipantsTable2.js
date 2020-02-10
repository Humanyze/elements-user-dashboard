import React from 'react';
import PropTypes from 'prop-types';
import './participants-table.scss';
import { Column, Table, defaultTableRowRenderer, AutoSizer } from 'react-virtualized';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import { withRouter } from 'react-router-dom';
import { elementsReact, elementsRedux } from 'ElementsWebCommon';

import 'react-virtualized/styles.css'; // only needs to be imported once

const HEADER_STYLE = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  padding: '.5em',
  borderBottom: '1px solid black',
  borderRight: '1px solid black',
  fontWeight: 'bold',
  textAlign: 'center',
};

const ROW_STYLE = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  padding: '.5em',
  borderBottom: '1px solid black',
  borderRight: '1px solid black',
};
//TODO:  Enhance with a function

const {
  LoadingUI,
} = elementsReact;
const {
  translationPropTypeShape,
} = elementsRedux;

const SortableTable = SortableContainer(Table);
const sortableTableRowRenderer = SortableElement(defaultTableRowRenderer);

function ParticipantsTable(props) {

  const {
    showLoading,
    participants,
    translations,
  } = props;

  if (showLoading) {
    return <LoadingUI/>;
  }
  return (
    <div className='ParticipantsTable' style={{ 'backgroundColor': 'yellow' , }}>
      <div className='ParticipantsTable__table-padding'>
        <div className='ParticipantsTable__table-wrapper'>
          <SortableTable
            width={1200}
            height={600}
            headerHeight={35}
            headerStyle={HEADER_STYLE}
            rowHeight={35}
            rowStyle={ROW_STYLE}
            rowCount={participants.length}
            rowGetter={({ index , }) => participants[index]}>
            <Column label='Email' dataKey='email' width={350} />
            <Column label='Alias' dataKey='alias' width={150} />
            <Column label='Gender' dataKey='gender' width={80} />
            <Column label='Manager?' dataKey='manager' width={80} />
            <Column label='Teams Managed' dataKey='teams_managed' width={80} />
            <Column label='Timezone' dataKey='timezone' width={100} />
            <Column label='Start Time' dataKey='working_hours_start' width={120} />
            <Column label='End Time' dataKey='working_hours_end' width={120} />
            <Column label='Badge?' dataKey='active_badge' width={80} />
            <Column label='Digital?' dataKey='active_digital' width={80} />
          </SortableTable>
        </div>
      </div>
    </div>
  );
}

ParticipantsTable.propTypes = {
  translations: translationPropTypeShape.isRequired,
  showLoading: PropTypes.bool.isRequired,
  participants: PropTypes.arrayOf(PropTypes.object), // NOT required
};

export default withRouter(ParticipantsTable);
