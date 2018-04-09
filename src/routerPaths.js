const publicUrl = process.env.PUBLIC_URL;

const paths = {
    basePath           : publicUrl,
    login              : '/login',
    deploymentSelection: `${publicUrl}/select-deployment`,
    deploymentOverview : `${publicUrl}/deployment-overview`
};


export default paths;