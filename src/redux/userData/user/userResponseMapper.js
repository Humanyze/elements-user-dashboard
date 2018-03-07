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

    const executiveDataSetIds = [];
    const deploymentDataSetIds = [];

    roleUriArray.map((roleUri) => {

        const role = roleUri.replace(/\/$/, '').split('/').splice(-1)[0];
        const id = parseInt(role.split('-').splice(-1)[0], 10);

        if (role.includes(DataSetTypeFlags.EXECUTIVE)) {
            executiveDataSetIds.push(id);
        } else if (role.includes(DataSetTypeFlags.DEPLOYMENT)) {
            deploymentDataSetIds.push(id);
        }
    });

    return { executiveDataSetIds, deploymentDataSetIds}
};

export {
    mapUserResponse,
    parseDataSetsFromRoles
};