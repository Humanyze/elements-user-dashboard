const mapUserResponse = (userResponse) => {
    const { executiveDataSetIds, deploymentDataSetIds } = parseDataSetsFromRoles(userResponse.roles);
    return {
        ...userResponse,
        executiveDataSetIds,
        deploymentDataSetIds
    };
};



// PORT-TODO: this is a temporary solution. we need a real API for the ACL
const parseDataSetsFromRoles = (roleUriArray) => {

    const DataSetTypeFlags = {
        EXECUTIVE: 'executive',
        DEPLOYMENT: 'admin'
    };

    const executiveDataSetIdsDict = {};
    const deploymentDataSetIdsDict = {};

    roleUriArray.map((roleUri) => {

        const role = roleUri.replace(/\/$/, '').split('/').splice(-1)[0];
        const id = role.split('-').splice(-1)[0];

        if (role.includes(DataSetTypeFlags.EXECUTIVE)) {
            return executiveDataSetIdsDict[id] = id;
        } else if (role.includes(DataSetTypeFlags.DEPLOYMENT)) {
            return deploymentDataSetIdsDict[id] = id;
        }
        return null;
    });

    const executiveDataSetIds = Object.keys(executiveDataSetIdsDict);
    const deploymentDataSetIds = Object.keys(deploymentDataSetIdsDict);

    return { executiveDataSetIds, deploymentDataSetIds };
};

export {
    mapUserResponse,
    parseDataSetsFromRoles
};