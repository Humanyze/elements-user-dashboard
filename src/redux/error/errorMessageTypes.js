const PRIORITIES = {
    LOW: 1,
    MED: 2,
    HIGH: 3
};

export const MESSAGE_TYPES = {
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
    redirectButtons: [{
        link: '/logout',
        textKey: 'errorMessage__userFetchFailure--button'
    }]
};

const userUnauthorizedFailure = {
    messageTranslationKey: 'errorMessage__userUnauthorizedFailure',
    type: MESSAGE_TYPES.FATAL,
    priority: PRIORITIES.MED,
    redirectButtons: [{
        link: '/deployments/select-deployment',
        textKey: 'errorMessage__userUnauthorizedFailure--button',
        reload: true
    }]
};

const genericDeploymentFailure = {
    messageTranslationKey: 'errorMessage__genericDeploymentFailure',
    type: MESSAGE_TYPES.FATAL,
    priority: PRIORITIES.MED,
    redirectButtons: [{
        link: '', // forces reload
        textKey: 'errorMessage__genericDeploymentFailure--button',
        reload: true
    }, {
        link: '/logout',
        textKey: 'logout',
    }]
};

const deploymentFetchFailure = {
    messageTranslationKey: 'errorMessage__deploymentFetchFailure',
    type: MESSAGE_TYPES.FATAL,
    priority: PRIORITIES.MED,
    redirectButtons: [{
        link: '', // forces reload
        textKey: 'errorMessage__deploymentFetchFailure--button',
        reload: true
    }, {
        link: '/logout',
        textKey: 'logout',
    }]
};

export default {
    participantExportFailure,
    userFetchFailure,
    userUnauthorizedFailure,
    genericDeploymentFailure,
    deploymentFetchFailure
};