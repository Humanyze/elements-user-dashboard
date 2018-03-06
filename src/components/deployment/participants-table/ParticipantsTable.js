import React from 'react';
import './participants-table.scss';
import {connect} from "react-redux";
import {compose, lifecycle} from "recompose";

import ParticipantsTableHeader from './participant-table-header/ParticipantsTableHeader';
import ParticipantsTableRow from './participant-table-row/ParticipantsTableRow';
import { requestParticipantsData } from "Redux/participants/participantsActions";


const withDidMount = lifecycle({
    componentDidMount() {
        // with persistence this will show data, but also ask for fresh stuff on mount
        this.props.requestParticipantsData();
    }
});

const enhance = compose(
    withDidMount
);

export const ParticipantsTablePure = ({participants}) => (
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

const ParticipantsTable = connect(
    (state) => ({
        participants: state.participants.participants
    }),
    {requestParticipantsData}
)(enhance(ParticipantsTablePure));

export default ParticipantsTable;