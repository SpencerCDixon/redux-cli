import commander from 'commander';
import New from '../sub-commands/new';

const subCommand = new New();

commander.on('--help', () => {
  subCommand.printUserHelp();
});

commander
  .arguments('<project name>')
  .option('-H, --use-https', 'Fetch starter kit over https')
  .action((dirName,command)=> {
    subCommand.run({
      dirName: dirName,
      useHttps:command.useHttps
    });
  })
  .parse(process.argv);
