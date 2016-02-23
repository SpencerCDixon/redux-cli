import commander from 'commander';
import ProjectSettings from '../projectSettings';
import { version } from '../version';
import { config } from 'generators/config';

commander
  .version(version())
  .arguments('<generator name>')
  .description('generates code based off a blueprint')
  .action(name => {
    const settings = new ProjectSettings();
    const Constructor = config[name];
    const component = new Constructor(name, settings);
    component.run();
  })
  .parse(process.argv);
