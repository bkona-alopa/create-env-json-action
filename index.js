const core = require('@actions/core');
const fs = require('fs');

try {
  const fileName = core.getInput('file-name');
  const customInputs = core.getInput('custom-inputs');

  // Parse customInputs string into key-value pairs
  const inputsArray = customInputs.split('\n').filter(input => input.trim() !== '');
  const obj = {};
  
  inputsArray.forEach(input => {
    const [key, value] = input.split('=');
    obj[key.trim()] = value.trim();
  });

  const fullPath = `${process.env.GITHUB_WORKSPACE}/${fileName}`;

  const fileContent = JSON.stringify(obj);

  fs.writeFileSync(fullPath, fileContent);

  console.log(`Successfully written file ${fullPath} with content ${fileContent}`);
  core.setOutput("full-path", fullPath);
} catch (error) {
  core.setFailed(error.message);
}
