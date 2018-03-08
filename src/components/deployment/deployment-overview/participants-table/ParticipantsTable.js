import React from 'react';

import './participants-table.scss';

import ParticipantsTableHeader from './participant-table-header/ParticipantsTableHeader';
import ParticipantsTableRow from './participant-table-row/ParticipantsTableRow';


const TableData = ({ participants }) => {
    return participants
        ? participants.length
            ? participants.map(el => <ParticipantsTableRow key={el.id} element={el}/>)
            : <tr>
                <td>No data in dataset</td>
            </tr>
        : <tr>
            <td>Loading...</td>
        </tr>;
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
                </div>
            </div>
        </div>
    );
};

export default ParticipantsTable;