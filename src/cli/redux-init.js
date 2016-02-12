import prompt from 'prompt';

import ProjectSettings from '../projectSettings';
import { danger, warning, success, create } from '../util/textHelper';
import initPrompt from '../prompts/initPrompt';
import { setupPrompt } from '../prompts/setup';

setupPrompt('init', prompt);

console.log(success('Redux CLI Initialization:'));
console.log();
console.log(
  danger('**NOTE**'),
  warning('All paths need to be relative to project root'),
  danger('**NOTE**')
);
console.log();

prompt.get(initPrompt, (err, result) => {
  console.log(success('Saving your settings...'));
  const { testPath, smartPath, dumbPath, formPath } = result;

  const settings = new ProjectSettings();
  settings.setSetting('testPath', testPath);
  settings.setSetting('smartPath', smartPath);
  settings.setSetting('dumbPath', dumbPath);
  settings.setSetting('formPath', formPath);
  settings.save();
  console.log(create('.reduxrc with configuration saved in project root.'));
});
