const express = require("express");
const app = express();
const { exec } = require("child_process");
const util = require("util");
const fs = require("fs");
const path = require("path");

// Convert exec to a promise-based function
const execPromise = util.promisify(exec);

app.get("/", async (req, res) => {
  const commands = [
    `git init`,
    `git add .`,
    `git commit -m "deleted"`,
    `git remote add origin https://github.com/skshadab1234/child_process.git`,
    `git push origin master`,
  ];

  const runCommandsInLoop = async () => {
    for (let i = 0; i < commands.length; i++) {
      try {
        console.log(`Executing: ${commands[i]}`);
        const { stdout, stderr } = await execPromise(commands[i]);

        if (stdout) console.log(`Output: ${stdout}`);
        if (stderr) console.error(`Error: ${stderr}`);

        console.log(`Command executed successfully: ${commands[i]}`);
      } catch (error) {
        console.error(
          `Failed to execute command "${commands[i]}": ${error.message}`
        );
      }
    }
  };

  // Start executing the commands
  await runCommandsInLoop();
  //   // Delete the current directory after commands are executed
  //   const currentDir = process.cwd();
  //   console.log(currentDir, "currentDir");

  //   fs.rm(currentDir, { recursive: true, force: true }, (err) => {
  //     if (err) {
  //       console.error(`Error deleting directory: ${err.message}`);
  //     } else {
  //       console.log(`${currentDir} was deleted successfully.`);
  //     }
  //   });
  // Send response before the server deletes itself
  res.send(
    "Started executing commands and deleting the current directory. The server will stop."
  );
});

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
