const PRIORITIES = {
    LOW: 1,
    MED: 2,
    HIGH: 3
};

const MESSAGE_TYPES = {
    FLASH: 'FLASH',
    FATAL: 'FATAL'
};


const participantExportFailure = {
    messageTranslationKey: 'errorMessage__participantExportFailure',
    type: MESSAGE_TYPES.FLASH,
    priority: PRIORITIES.LOW
};

const userFetchFailure = {
    messageTranslationKey: 'errorMessage__userFetchFailure',
    type: MESSAGE_TYPES.FATAL,
    priority: PRIORITIES.HIGH,
    redirectButton: {
        link: '/logout',
        textKey: 'errorMessage__userFetchFailure--button'
    }
};



export default {
    participantExportFailure,
    userFetchFailure
};