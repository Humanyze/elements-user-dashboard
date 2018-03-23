import React from 'react';
// import MaterialIcon from 'material-icons-react';

import './participants-table.scss';

import ParticipantsTableHeader from './participant-table-header/ParticipantsTableHeader';
import ParticipantsTableRow from './participant-table-row/ParticipantsTableRow';
import Pagination from 'Common/pagination/Pagination';
import LoadingUI from 'Common/loading/LoadingUI';


const TableData = ({ participants, showLoading }) => {
    if (showLoading) return null;
    return participants
        ? participants.length
            ? participants.map(el => <ParticipantsTableRow key={el.id} element={el}/>)
            : <tr>
                <td>No data in dataset</td>
            </tr>
        :  null;
};

export const ParticipantsTable = (props) => {


    return (
        <div className='ParticipantsTable'>
            <div className='ParticipantsTable__title'>
                Participants
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
                <Pagination/>

            </div>
        </div>
    );
};

export default ParticipantsTable;