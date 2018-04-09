import React from 'react';

import './participants-table.scss';

import ParticipantsTableHeader from './participant-table-header/ParticipantsTableHeader';
import ParticipantsTableRow from './participant-table-row/ParticipantsTableRow';
import Pagination from 'Common/pagination/Pagination';
// import LoadingUI from 'Common/loading/LoadingUI';
import { withRouter } from 'react-router-dom';
// import * as queryString from 'Utils/query-string';
import LoadingUI from 'Src/components/common/loading/LoadingUI';


const TableData = ({ participants, showLoading }) => {
    if (showLoading) return null;
    return participants
        ? participants.length
            ? participants.map(participant => <ParticipantsTableRow key={participant.id} participant={participant}/>)
            : <tr>
                <td>No data in dataset</td>
            </tr>
        : null;
};

export const ParticipantsTable = withRouter(({ activePageNumber, numberOfPages, showLoading, paginationLoading, participants, translations }) => {
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
                {!showLoading && <Pagination activePageNumber={activePageNumber} numberOfPages={numberOfPages} />}

            </div>
        </div>
    );
});

export default ParticipantsTable;