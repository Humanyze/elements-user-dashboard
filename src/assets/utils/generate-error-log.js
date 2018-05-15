import jsPDF from 'jspdf';
import 'jspdf-autotable';


const GRID_Y = 60;

/* eslint-disable no-magic-numbers */

const title = {
    fontSize: 36,
    x       : 10,
    y       : 20
};

const subheader = {
    fontSize: 24,
    x       : 10,
    y       : 40
};

/* eslint-enable no-magic-numbers */

const columnTitles = [
    'Row',
    'Error message'
];

function parseErrors(errorsHash) {
    const errorsHashCopy = { ...errorsHash };
    delete errorsHashCopy.count;

    const errors = [];

    for (let row in errorsHashCopy) {

        const rowArray = row.split('_');
        const rowNumber = rowArray[rowArray.length - 1];
        const rowErrors = errorsHashCopy[row];

        rowErrors.forEach((error) => errors.push([rowNumber, error]));

    }

    return errors.sort((errorA, errorB) => {
        const [rowA] = errorA;
        const [rowB] = errorB;

        return rowA - rowB;
    });
}

export default function (name, errors, sheetName) {
    const errorLog = new jsPDF();

    errorLog.setFontSize(title.fontSize);
    errorLog.text(name, title.x, title.y);

    errorLog.setFontSize(subheader.fontSize);
    errorLog.text(`Errors in sheet: "${sheetName}"`, subheader.x, subheader.y);

    const rows = parseErrors(errors);

    errorLog.autoTable(columnTitles, rows, {
        theme : 'grid',
        startY: GRID_Y
    });

    return errorLog;
}
