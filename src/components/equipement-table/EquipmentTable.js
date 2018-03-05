import React from 'react';
import PropTypes from 'prop-types';
import './equipment-table.scss';

import EquipmentTableHeader from './equipment-table-header/EquipmentTableHeader';
import EquipmentTableRow from './equipment-table-row/EquipmentTableRow';


const EquipmentTable = ({elements}) => (
    <div className='EquipmentTable'>
        <div className='EquipmentTable__title'>
            Equipment
        </div>
        <div className='EquipmentTable__table-padding'>
            <div className='EquipmentTable__table-wrapper'>
                <table className='EquipmentTable__table'>
                    <tbody>
                    <EquipmentTableHeader/>
                    {elements
                        ? elements.length
                            ? elements.map(el => <EquipmentTableRow key={el.id} element={el}/>)
                            : <tr><td>No data in dataset</td></tr>
                        : <tr><td>Loading...</td></tr>
                    }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

EquipmentTable.propTypes = {
    elements: PropTypes.arrayOf(EquipmentTableRow.propTypes.element)
};

export default EquipmentTable;