import React from 'react';
import './equipment-table-header.scss';

const headers = [
    {text: 'Email'},
    {text: 'Alias'},
    {text: 'Gender'},
    {text: 'Manager'},
    {text: 'Teams Managed'},
    {text: 'TimeZone'},
    {text: 'Working Hours Start'},
    {text: 'Working Hours End'},
    {text: 'Primary Team'},
    {text: 'Active Badge'},
    {text: 'Active Digital'}
];
const EquipmentTableHeader = () => {
    return <tr className='EquipmentTableHeader'>
        {headers.map(header => {
            return (
                <th className='EquipmentTableHeader__column-header' key={header.text}>
                    {header.text}
                </th>
            )
        })}
    </tr>
};

export default EquipmentTableHeader;