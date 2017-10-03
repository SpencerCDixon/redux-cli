import getEnvironment from '../environment';
import Config from '../../sub-commands/config';

const subCommand = new Config(getEnvironment());

const usage = 'Usage:\n  $0 config';

module.exports = {
  command: 'config',
  describe: 'Display current configuration',
  builder: yargs => yargs.usage(usage),
  handler: () => subCommand.run()
};
