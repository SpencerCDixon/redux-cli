import commander from 'commander';
import { version } from '../version';

commander
  .version(version())
  .arguments('<generator name>')
  .description('generates code based off a blueprint')
  .action(name => {
    console.log('generating..', name);
  })
  .parse(process.argv);
