import * as th from '../util/textHelper';
import prompt from 'prompt';

console.log(th.success('Redux CLI Initialization:'));

prompt.start();
prompt.get(['testPath', 'componentPath'], function (err, result) {
  console.log('Command-line input received:');
  console.log('test path: ' + result.testPath);
  console.log('component path  : ' + result.componentPath);
});
