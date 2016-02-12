import commander from 'commander';
import { version } from '../version';

commander
  .version(version())
  .command('init', 'initialize a .reduxrc file for project details')
  .parse(process.argv);
