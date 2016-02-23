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
    testBase, smartPath, dumbPath, formPath,
    fileExtension, sourceBase, duckPath, reducerPath, fileCasing
  } = result;

  const settings = new ProjectSettings();
  settings.setSetting('sourceBase', sourceBase);
  settings.setSetting('testBase', testBase);

  // generator specific
  settings.setSetting('smartPath', smartPath);
  settings.setSetting('dumbPath', dumbPath);
  settings.setSetting('formPath', formPath);
  settings.setSetting('duckPath', duckPath);
  settings.setSetting('reducerPath', reducerPath);

  // project wide file naming conventions
  settings.setSetting('fileExtension', fileExtension);
  settings.setSetting('fileCasing', fileCasing);
  settings.save();
  create('.reduxrc with configuration saved in project root.');
});
