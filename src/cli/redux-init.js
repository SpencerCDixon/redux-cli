import commander from 'commander';
import Init from '../sub-commands/init-command';

const subCommand = new Init();

commander.on('--help', () => {
  subCommand.printUserHelp();
});

subCommand.run();

