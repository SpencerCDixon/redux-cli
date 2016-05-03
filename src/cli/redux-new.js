import commander from 'commander';
import New from '../sub-commands/new';

const subCommand = new New();

commander.on('--help', () => {
  subCommand.printUserHelp();
});

commander
  .arguments('<project name>')
  .option('-S, --use-ssh', 'Fetch starter kit over ssh')
  .action((dirName,command)=> {
    subCommand.run({
      dirName: dirName,
      useSsh: command.useSsh
    });
  })
  .parse(process.argv);
