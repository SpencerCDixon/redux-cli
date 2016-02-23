import commander from 'commander';
import ProjectSettings from '../projectSettings';
import { version } from '../version';
import DumbComponent from '../generators/dumbComponent';
import SmartComponent from '../generators/smartComponent';
import FormComponent from '../generators/formComponent';
import ReduxDuck from '../generators/reduxDuck';
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

    // TODO: come up with a better way to approach this.  Don't know enough
    // about Node to figure how to do proper implement polymorphism
    if (generatorName === 'dumb') {
      component = new DumbComponent(compName, settings);
    } else if (generatorName === 'smart') {
      component = new SmartComponent(compName, settings);
    } else if (generatorName === 'form') {
      component = new FormComponent(compName, settings);
    } else if (generatorName === 'duck') {
      component = new ReduxDuck(compName, settings);
    } else {
      error('not a valid generator type');
      info(`valid generator types: ${success(availableGenerators.join(', '))}`);
      return;
    }
    component.run();
  })
  .parse(process.argv);
