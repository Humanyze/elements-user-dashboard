import React from 'react';

import './participants-table.scss';

import ParticipantsTableHeader from './participant-table-header/ParticipantsTableHeader';
import ParticipantsTableRow from './participant-table-row/ParticipantsTableRow';
import MaterialIcon from 'material-icons-react';
import Pagination from 'Src/components/common/pagination/Pagination';


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
                    {/*<MaterialIcon icon='angle_double_left' size={45}/>*/}
                    <MaterialIcon icon='chevron_left' size={45}/>
                    <table className='ParticipantsTable__table'>
                        <tbody>
                        {/* can set order options*/}
                        <ParticipantsTableHeader/>
                        <TableData {...props}/>
                        </tbody>
                    </table>
                    <MaterialIcon icon='chevron_right' size={45}/>
                </div>
                <Pagination />

            </div>
        </div>
    );
};

export default ParticipantsTable;