import commander from 'commander';
import New from '../sub-commands/new';

const command = new New();

commander.on('--help', () => {
  command.printUserHelp();
});

commander
  .arguments('<project name>')
  .action(dirName => {
    command.run({
      dirName: dirName
    });
  })
  .parse(process.argv);
