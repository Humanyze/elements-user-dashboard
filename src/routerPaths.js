const publicUrl = process.env.PUBLIC_URL;

const base = {
  basePath: publicUrl,
  login: '/login',
  selectDeployment: '/select-deployment',
  deployment: '/deployment/:id(\\d+)',
};

const basePaths = {
  ...base,
  collaboration: `${base.deployment}/collaboration`,
  workload: `${base.deployment}/workload`,
  inclusion: `${base.deployment}/inclusion`,
};

const paths = {
  ...basePaths,
  // collaboration
  collaboration__adjacencies: `${basePaths.collaboration}/adjacencies`,
  collaboration__communicationDistribution: `${basePaths.collaboration}/communication-distribution`,
  collaboration__responseTime: `${basePaths.collaboration}/response-time`,

  // workload
  workload__workdayLength: `${basePaths.workload}/average-workday-length`,
  workload__drivers: `${basePaths.workload}/drivers`,
  workload__responseTime: `${basePaths.workload}/response-time`,
  workload__timeAllocation: `${basePaths.workload}/time-allocation`,

  // diversity & inclusion
  inclusion__commByGender: `${basePaths.inclusion}/communication-by-gender`,
  inclusion__commByGenderPerGroup: `${basePaths.inclusion}/communication-by-gender-per-group`,
};


export default paths;
