import chalk from 'chalk';
import prompt from 'prompt';
import fs from 'fs';

console.log('Redux CLI Initialization:');


// Start the prompt
prompt.start();
prompt.get(['testPath', 'componentPath'], function (err, result) {
  console.log('Command-line input received:');
  console.log('test path: ' + result.testPath);
  console.log('component path  : ' + result.componentPath);

  
});
