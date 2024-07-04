const core = require('@actions/core');
const fs = require('fs');

try {
  const fileName = core.getInput('file-name');
  const customInputs = core.getInput('custom-inputs');

  // Check if customInputs is defined and not empty
  if (!customInputs) {
    throw new Error("Input 'custom-inputs' is required and cannot be empty.");
  }

  // Split customInputs into key-value pairs
  const inputsArray = customInputs.split('\n').filter(input => input.trim() !== '');

  const obj = {};
  
  inputsArray.forEach(input => {
    const pair = input.split('=');
    if (pair.length === 2) {
      const key = pair[0].trim();
      const value = pair[1].trim();
      obj[key] = value;
    } else {
      throw new Error(`Invalid input format: ${input}`);
    }
  });

  const fullPath = `${process.env.GITHUB_WORKSPACE}/${fileName}`;

  const fileContent = JSON.stringify(obj);

  fs.writeFileSync(fullPath, fileContent);

  console.log(`Successfully written file ${fullPath} with content ${fileContent}`);
  core.setOutput("full-path", fullPath);
} catch (error) {
  core.setFailed(error.message);
}
