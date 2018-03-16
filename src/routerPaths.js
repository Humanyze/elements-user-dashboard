const publicUrl = process.env.PUBLIC_URL;

const paths = {
    basePath           : publicUrl,
    deploymentSelection: `${publicUrl}/select-deployment`,
    deploymentOverview : `${publicUrl}/deployment-overview`
};


export default paths;