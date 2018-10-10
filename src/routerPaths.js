const publicUrl = process.env.PUBLIC_URL;

const basePaths = {
  basePath     : publicUrl,
  login        : '/login',
  selectedDeployment: '/select-deployment',
  dashboards: '/:id(\\d+)',
  collaboration: '/collaboration',
  workload     : '/workload',
  inclusion : '/inclusion',
};

const paths = {
  ...basePaths,
  // collaboration
  collaboration__adjacencies: `${basePaths.collaboration}/adjacencies`,
  collaboration__commDistribution: `${basePaths.collaboration}/communication-distribution`,
  collaboration__responseTime: `${basePaths.collaboration}/response-time`,

  // workload
  workload__workdayLength: `${basePaths.workload}/average-workday-length`,
  workload__drivers: `${basePaths.workload}/drivers`,
  workload__responseTime: `${basePaths.workload}/response-time`,
  workload__timeAllocation: `${basePaths.workload}/time-allocation`,

  // diversity & inclusion
  inclusion__commByGender: `${basePaths.inclusion}/communication-by-gender`,
  inclusion__commByTeam: `${basePaths.inclusion}/communication-by-gender-per-team`
};


export default paths;