import getEnvironment from '../environment';
import New from '../../sub-commands/new';

const subCommand = new New(getEnvironment());

const usage = `Usage:
  $0 new <project_name>

Create a new project from react-redux-starter-kit`;

module.exports = {
  command: 'new <project_name>',
  //describe: 'Create a new blueprint-enabled project',
  describe: false, // hide in 2.0
  builder: yargs =>
    yargs
      .usage(usage)
      .option('use-ssh', {
        alias: 'S',
        describe: 'Fetch starter kit over ssh',
        type: 'boolean'
      })
      .option('use-boilerplate', {
        alias: 'B',
        describe: 'Create from redux-cli-boilerplate',
        type: 'boolean'
      })
      .option('use-uikit', {
        alias: 'U',
        describe: 'Create from redux-cli-ui-kit-boilerplate',
        type: 'boolean'
      })
      .strict()
      .check(argv => {
        if (argv.useBoilerplate && argv.useUikit) {
          throw new Error(
            'Only specify one of --use-boilerplate or --use-uikit'
          );
        }
        return true;
      }),
  handler: argv => {
    subCommand.run({
      dirName: argv.project_name,
      useSsh: argv.useSsh,
      useBoilerplate: argv.useBoilerplate,
      useUIKit: argv.useUikit
    });
  }
};
