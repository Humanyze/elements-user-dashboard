const mapUserResponse = (userResponse) => {
    const {executiveDataSetIds, deploymentDataSetIds} = parseDataSetsFromRoles(userResponse.roles);
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

    const executiveDataSetIds = [];
    const deploymentDataSetIds = [];

    roleUriArray.map((roleUri) => {

        const role = roleUri.replace(/\/$/, '').split('/').splice(-1)[0];
        const id = role.split('-').splice(-1)[0];

        if (role.includes(DataSetTypeFlags.EXECUTIVE)) {
            return executiveDataSetIds.push(id);
        } else if (role.includes(DataSetTypeFlags.DEPLOYMENT)) {
            return deploymentDataSetIds.push(id);
        }
        return null;
    });

    return {executiveDataSetIds, deploymentDataSetIds};
};

export {
    mapUserResponse,
    parseDataSetsFromRoles
};