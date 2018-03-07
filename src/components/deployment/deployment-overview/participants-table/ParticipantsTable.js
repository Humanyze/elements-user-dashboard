import React from 'react';
import './participants-table.scss';
import {connect} from "react-redux";
import {compose, lifecycle} from "recompose";

import ParticipantsTableHeader from './participant-table-header/ParticipantsTableHeader';
import ParticipantsTableRow from './participant-table-row/ParticipantsTableRow';


export const ParticipantsTablePure = (props) => {
    console.log(props);
    const { participants } = props;
    return (
        <div className='ParticipantsTable'>
            <div className='ParticipantsTable__title'>
                Participants
            </div>
            <div className='ParticipantsTable__table-padding'>
                <div className='ParticipantsTable__table-wrapper'>
                    <table className='ParticipantsTable__table'>
                        <tbody>
                        <ParticipantsTableHeader/>
                        {participants
                            ? participants.length
                                ? participants.map(el => <ParticipantsTableRow key={el.id} element={el}/>)
                                : <tr>
                                    <td>No data in dataset</td>
                                </tr>
                            : <tr>
                                <td>Loading...</td>
                            </tr>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const ParticipantsTable = ParticipantsTablePure;

export default ParticipantsTable;