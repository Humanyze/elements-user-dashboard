import React from 'react';
import PropTypes from 'prop-types';
import './equipment-table-row.scss';

const EquipmentTableRow = ({element}) => {
    console.log(element);
    return (
        <tr className='EquipmentTableRow'>
            <td >{element.email}</td>
            <td >{element.alias}</td>
            <td >{element.gender}</td>
            <td >{element.manager}</td>
            <td >{element.teams_managed ? element.teams_managed.join(', '): ''}</td>
            <td >{element.timezone}</td>
            <td >{element.working_hours_start}</td>
            <td >{element.working_hours_end}</td>
            <td >{element.primary_team}</td>
            <td >{element.active_badge}</td>
            <td >{element.active_digital}</td>
        </tr>
    );
};

EquipmentTableRow.propTypes = {
    element: PropTypes.shape({
        email: PropTypes.string,
        alias: PropTypes.string.isRequired,
        gender: PropTypes.string,
        manager: PropTypes.string,
        teams_managed: PropTypes.array,
        timezone: PropTypes.string,
        working_hours_start: PropTypes.string,
        working_hours_end: PropTypes.string,
        primary_team: PropTypes.string,
        active_badge: PropTypes.string,
        active_digital: PropTypes.string
    })
};

export default EquipmentTableRow;