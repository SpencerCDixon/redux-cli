import prompt from 'prompt';
import figlet from 'figlet';

import ProjectSettings from '../projectSettings';
import { danger, warning, success, create } from '../util/textHelper';
import initPrompt from '../prompts/initPrompt';
import { setupPrompt } from '../prompts/setup';

setupPrompt('initialization', prompt);
console.log(success(
  figlet.textSync('Redux-CLI', {
    font: 'Doom',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }
)));

console.log(danger('*****************************************************'));
console.log(
  danger('*'),
  warning('  All paths need to be relative to project root  '),
  danger('*')
);
console.log(danger('*****************************************************'));
console.log();

prompt.get(initPrompt, (err, result) => {
  console.log(success('Saving your settings...'));

  const {
    testPath, smartPath, dumbPath, formPath,
    fileExtension, sourceBase, duckPath, reducerPath
  } = result;

  const settings = new ProjectSettings();
  settings.setSetting('sourceBase', sourceBase);
  settings.setSetting('testPath', testPath);
  settings.setSetting('smartPath', smartPath);
  settings.setSetting('dumbPath', dumbPath);
  settings.setSetting('formPath', formPath);
  settings.setSetting('duckPath', duckPath);
  settings.setSetting('reducerPath', reducerPath);
  settings.setSetting('fileExtension', fileExtension);
  settings.save();
  create('.reduxrc with configuration saved in project root.');
});
