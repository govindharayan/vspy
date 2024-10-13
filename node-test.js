// test-node.js

// Print Node.js version
console.log("Node.js Version:", process.version);

// Print npm version
const { exec } = require("child_process");

exec("npm --version", (error, stdout, stderr) => {
    if (error) {
        console.error(`Error fetching npm version: ${stderr}`);
        return;
    }
    console.log("npm Version:", stdout.trim());
});

// Print current working directory
console.log("Current Working Directory:", process.cwd());

// Print a test message
console.log("Node.js is working correctly!");
