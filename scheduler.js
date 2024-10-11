const cron = require('node-cron');
const { exec } = require('child_process');

cron.schedule('0 * * * *', () => {
  exec('npx playwright test ./test-9.spec.ts --project chromium --headed --trace on --workers 1 --timeout 600000', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });
});
