import React from 'react';
// import MaterialIcon from 'material-icons-react';

import './participants-table.scss';

import ParticipantsTableHeader from './participant-table-header/ParticipantsTableHeader';
import ParticipantsTableRow from './participant-table-row/ParticipantsTableRow';
import Pagination from 'Common/pagination/Pagination';
import LoadingUI from 'Common/loading/LoadingUI';
import { withRouter } from 'react-router-dom';
import queryString  from 'query-string';


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

export const ParticipantsTable = withRouter((props) => {
    const { location: { search } } = props;
    const { page = '1' } = queryString.parse(search);
    const prePageLink = '';
    const activePageNumber = parseInt(page, 10);

    return (
        <div className='ParticipantsTable'>
            <div className='ParticipantsTable__title'>
                {props.translations.participantTable__header}
            </div>
            <div className='ParticipantsTable__table-padding'>
                <div className='ParticipantsTable__table-wrapper'>
                    <table className='ParticipantsTable__table'>
                        <tbody>
                        {/* can set order options*/}
                        <ParticipantsTableHeader/>
                        <TableData {...props}/>
                        </tbody>
                    </table>
                    {
                        props.showLoading && <div className='ParticipantsTable__loading-wrapper'><LoadingUI/></div>
                    }
                </div>
                {!props.showLoading && <Pagination activePageNumber={activePageNumber} baseLink={prePageLink}/>}

            </div>
        </div>
    );
});

export default ParticipantsTable;