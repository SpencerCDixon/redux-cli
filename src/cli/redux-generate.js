import commander from 'commander';
import ProjectSettings from '../projectSettings';
import { version } from '../version';
import DumbComponent from '../generators/DumbComponent';
import { error, info, success } from '../util/textHelper';

const availableGenerators = [
  'dumb',
  'form',
  'smart',
  'duck'
];

commander
  .version(version())
  .arguments('<generator name> [component name]')
  .description('generates code based off a blueprint')
  .action((generatorName, compName) => {
    const settings = new ProjectSettings();
    let component;

    if (generatorName === 'dumb') {
      component = new DumbComponent(compName, settings);
    } else {
      error('not a valid generator type');
      info(`valid generator types: ${success(availableGenerators.join(', '))}`);
      return;
    }
    component.run();
  })
  .parse(process.argv);
