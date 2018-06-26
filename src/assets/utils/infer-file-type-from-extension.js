export const fileTypeDictionary = {
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.xltx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    '.xlsm': 'application/vnd.ms-excel.sheet.macroEnabled.12',
    '.xltm': 'application/vnd.ms-excel.template.macroEnabled.12'
};

export const fileTypeList = Object.values(fileTypeDictionary);


// NOTE: via https://stackoverflow.com/questions/6582171/javascript-regex-for-matching-extracting-file-extension
const FILE_EXTENSION_REGEX = /\.[0-9a-z]+$/i;

const inferFileTypeFromExtension = (fileName = '')  => {
    const extension = fileName.match(FILE_EXTENSION_REGEX);
    const mimeType = fileTypeDictionary[extension];
    return !!mimeType ? mimeType : '';
};

export default inferFileTypeFromExtension;