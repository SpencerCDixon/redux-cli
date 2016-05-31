import commander from 'commander';
import { version } from '../version';

const program = commander;

program
  .version(version());

program
  .command('init', 'initialize a .reduxrc file for project details');

program
  .command('new', 'creates a new redux project');

// fake an alias for generate since commander doesn't support
// aliases for sub-commands.
program
  .command('generate', 'generates new code from blueprints')
  .command('g', 'alias for generate')
  .alias('g');//Fix alias 'redux g' missing for Windows

program.parse(process.argv);
