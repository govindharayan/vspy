const { exec } = require('child_process');
const path = require('path');

// Path to the batch file
const batchFilePath = 'C:\\Scripts\\login.bat';

// Function to run the batch file
function runBatchFile() {
  return new Promise((resolve, reject) => {
    exec(`cmd /c "${batchFilePath}"`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing batch file: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`Standard Error: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
}

// Function to execute the batch file multiple times
async function runBatchFileMultipleTimes(times, interval) {
  for (let i = 0; i < times; i++) {
    try {
      const output = await runBatchFile();
      console.log(`Batch file output (run ${i + 1}):\n${output}`);
    } catch (error) {
      console.error(`Batch file execution failed (run ${i + 1}):\n${error}`);
    }

    if (i < times - 1) { // No need to wait after the last run
      console.log(`Waiting ${interval} milliseconds before next run...`);
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }
}

// Run the batch file 5 times, each time 1 hour (3600000 milliseconds) apart
const numberOfRuns = 5;
const intervalBetweenRuns = 3600000; // 1 hour in milliseconds

runBatchFileMultipleTimes(numberOfRuns, intervalBetweenRuns);
