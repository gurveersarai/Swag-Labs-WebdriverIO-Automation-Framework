const fs = require('fs');
const path = require('path');

const executor = {
  name: process.env.DEVOPS_NAME || 'Azure DevOps',
  type: process.env.DEVOPS_TYPE || 'azure-devops',
  url: process.env.BUILD_BUILDURI || '',          // Azure DevOps build URL env var
  buildOrder: process.env.BUILD_BUILDNUMBER ? parseInt(process.env.BUILD_BUILDNUMBER) : null,
  buildName: process.env.BUILD_DEFINITIONNAME || '',
  reportUrl: process.env.ALLURE_REPORT_URL || ''
};

const resultsDir = path.join(process.cwd(), 'allure-results');
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir);
}

fs.writeFileSync(path.join(resultsDir, 'executor.json'), JSON.stringify(executor, null, 2));
console.log('executor.json created:', executor);
