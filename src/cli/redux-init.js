import commander from 'commander';
import Init from '../sub-commands/init';

const subCommand = new Init();

commander.on('--help', () => {
  subCommand.printUserHelp();
});

subCommand.run();

