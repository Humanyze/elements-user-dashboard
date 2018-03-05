import React from 'react';
import './equipment-table.scss';
import {connect} from "react-redux";
import {compose, lifecycle} from "recompose";

import EquipmentTableHeader from './equipment-table-header/EquipmentTableHeader';
import EquipmentTableRow from './equipment-table-row/EquipmentTableRow';
import {requestParticipantsData} from "../../redux/participants/participantsActions";


const withDidMount = lifecycle({
    componentDidMount() {
        // with persistence this will show data, but also ask for fresh stuff on mount
        this.props.requestParticipantsData();
    }
});

const enhance = compose(
    withDidMount
);

export const EquipmentTablePure = ({participants}) => (
    <div className='EquipmentTable'>
        <div className='EquipmentTable__title'>
            Equipment
        </div>
        <div className='EquipmentTable__table-padding'>
            <div className='EquipmentTable__table-wrapper'>
                <table className='EquipmentTable__table'>
                    <tbody>
                    <EquipmentTableHeader/>
                    {participants
                        ? participants.length
                            ? participants.map(el => <EquipmentTableRow key={el.id} element={el}/>)
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

const EquipmentTable = connect(
    (state) => ({
        participants: state.participants.participants
    }),
    {requestParticipantsData}
)(enhance(EquipmentTablePure));

export default EquipmentTable;