import commander from 'commander';
import { version } from '../version';

commander
  .version(version())
  .command('init', 'initialize a .reduxrc file for project details')
  .command('dumb', 'creates a dumb/pure component in appropriate path with matching test file')
  .command('smart', 'creates a smart/container component in appropriate path with matching test file')
  .command('form', 'creates a redux-form component in appropriate path with matching test file')
  .command('duck', 'creates a redux duck in appropriate path with matching test file')
  .parse(process.argv);
