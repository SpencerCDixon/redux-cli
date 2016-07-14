import commander from 'commander';
import New from '../sub-commands/new';

const subCommand = new New();

commander.on('--help', () => {
  subCommand.printUserHelp();
});

commander
  .arguments('<project name>')
  .option('-S, --use-ssh', 'Fetch starter kit over ssh')
  .option('-B, --use-boilerplate', 'Fetch Redux-CLI boilerplate instead of react-redux-starter-kit')
  .option('-U, --use-uikit', 'Fetch UI Kit boilerplate instead of react-redux-starter-kit')
  .action((dirName,command) => {
    subCommand.run({
      dirName: dirName,
      useSsh: command.useSsh,
      useBoilerplate: command.useBoilerplate,
      useUIKit: command.useUikit
    });
  })
  .parse(process.argv);
