import commander from 'commander';
import { version } from '../version';

const program = commander;

program
  .version(version());

program
  .command('init', 'initialize a .reduxrc file for project details')
  .command('dumb', 'creates a dumb/pure component in appropriate path with matching test file')
  .command('smart', 'creates a smart/container component in appropriate path with matching test file')
  .command('form', 'creates a redux-form component in appropriate path with matching test file')
  .command('duck', 'creates a redux duck in appropriate path with matching test file');

program
  .command('new', 'creates a new redux project');

program
  .command('generate', 'generates code based off a blueprint')
  // fake an alias for generate since commander doesn't support
  // aliases for sub-commands.
  .command('g', 'alias for generate');

program.parse(process.argv);
