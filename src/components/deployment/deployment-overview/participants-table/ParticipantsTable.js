import React from 'react';

import './participants-table.scss';

import ParticipantsTableHeader from './participant-table-header/ParticipantsTableHeader';
import ParticipantsTableRow from './participant-table-row/ParticipantsTableRow';
import { withRouter } from 'react-router-dom';
import { elementsReact } from 'ElementsWebCommon';

const {
  Pagination,
  LoadingUI,
} = elementsReact;
const TableData = ({ participants, showLoading, }) => {
  if (showLoading) return null;
  return participants
    ? participants.length
      ? participants.map((participant) => <ParticipantsTableRow key={participant.id} participant={participant}/>)
      : <tr>
        <td>No data in dataset</td>
      </tr>
    : null;
};

export const ParticipantsTable = withRouter(({ activePageNumber, numberOfPages, onPaginationPageClicked, showLoading, paginationLoading, participants, translations, }) => {
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
});

export default ParticipantsTable;
