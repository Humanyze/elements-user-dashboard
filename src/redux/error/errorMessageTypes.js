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
    message: 'participantExportFailure',
    type: MESSAGE_TYPES.FLASH,
    priority: PRIORITIES.LOW
};

const userFetchFailure = {
    message: `It appears your session expired.  Let's get you logged in.`,
    type: MESSAGE_TYPES.FATAL,
    priority: PRIORITIES.HIGH,
    goTo: '/logout'
};



export default {
    participantExportFailure,
    userFetchFailure
};