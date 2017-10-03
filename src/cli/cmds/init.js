import getEnvironment from '../environment';
import Init from '../../sub-commands/init';

const subCommand = new Init(getEnvironment());

const usage = 'Usage:\n  $0 init';

module.exports = {
  command: 'init',
  describe: 'Initialize .blueprintrc for the current project',
  builder: yargs => yargs.usage(usage),
  handler: () => subCommand.run()
};
