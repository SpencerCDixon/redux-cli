import commander from 'commander';

const program = commander
  .version('0.0.1')
  .command('init', 'initialize a .reduxrc file for project details')
  .parse(process.argv);
