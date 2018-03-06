import React from 'react';
import './participants-table-header.scss';

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
const ParticipantsTableHeader = () => {
    return <tr className='ParticipantsTableHeader'>
        {headers.map(header => {
            return (
                <th className='ParticipantsTableHeader__column-header' key={header.text}>
                    {header.text}
                </th>
            )
        })}
    </tr>
};

export default ParticipantsTableHeader;