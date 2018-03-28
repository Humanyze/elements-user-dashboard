import React from 'react';
import './participants-table-row.scss';
import { getViewableParticipantKeys } from 'Redux/participants-ui/participantsUIReducer';
import { connect } from 'react-redux';

const ParticipantsTableRowPure = ({ participant, viewableKeys }) => {
    return (
        <tr className='ParticipantsTableRow'>
            {viewableKeys.map(key => <TableCell key={key} value={participant[key]}/>)}
        </tr>
    );
};

const ParticipantsTableRow = connect(
    (state) => ({
        viewableKeys: getViewableParticipantKeys(state)
    })
)(ParticipantsTableRowPure);


export default ParticipantsTableRow;


const TableCell = ({ value }) => <td>{value}</td>;