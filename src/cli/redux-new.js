import commander from 'commander';
import New from '../sub-commands/new';

const subCommand = new New();

commander.on('--help', () => {
  subCommand.printUserHelp();
});

commander
  .arguments('<project name>')
  .action(dirName => {
    subCommand.run({
      dirName: dirName
    });
  })
  .parse(process.argv);
