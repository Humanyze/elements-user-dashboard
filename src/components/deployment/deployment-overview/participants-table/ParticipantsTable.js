import React from 'react';
import PropTypes from 'prop-types';
import './participants-table.scss';

import ParticipantsTableHeader from './participant-table-header/ParticipantsTableHeader';
import ParticipantsTableRow from './participant-table-row/ParticipantsTableRow';
import { withRouter } from 'react-router-dom';
import { elementsReact, elementsRedux } from 'ElementsWebCommon';

const {
  Pagination,
  LoadingUI,
} = elementsReact;
const {
  translationPropTypeShape,
} = elementsRedux;

const TableData = ({ participants, showLoading, }) => {
  if (showLoading) {
    return (<div>Loading...</div>);
  }
  if (participants && participants.length) {
    return participants.map((participant) => <ParticipantsTableRow key={participant.id} participant={participant}/>);
  }
  return (
    <tr>
      <td>No data in dataset</td>
    </tr>
  );
};

export const ParticipantsTable = ({ activePageNumber, numberOfPages, onPaginationPageClicked, showLoading, paginationLoading, participants, translations, }) => {
  return (
    <div className='ParticipantsTable'>
      <div className='ParticipantsTable__title'>
        {translations.participantTable__header}
      </div>
      <div className='ParticipantsTable__table-padding'>
        <div className='ParticipantsTable__table-wrapper'>
          <table className='ParticipantsTable__table'>
            <tbody>
              {/* can set order options*/}
              <ParticipantsTableHeader/>
              <TableData showLoading={showLoading || paginationLoading} participants={participants}/>
            </tbody>
          </table>
          {
            (showLoading || paginationLoading) && <div className='ParticipantsTable__loading-wrapper'><LoadingUI  theme={'humanyze-blue-theme'}/></div>
          }
        </div>
        {!showLoading && <Pagination activePageNumber={activePageNumber} numberOfPages={numberOfPages} onPaginationPageClicked={onPaginationPageClicked} />}

      </div>
    </div>
  );
};

ParticipantsTable.propTypes = {
  translations: translationPropTypeShape.isRequired,
  activePageNumber: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  onPaginationPageClicked: PropTypes.func.isRequired,
  showLoading: PropTypes.bool.isRequired,
  paginationLoading: PropTypes.bool.isRequired,
  participants: PropTypes.arrayOf(PropTypes.object), // NOT required
};

export default withRouter(ParticipantsTable);
