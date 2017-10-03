import Config from '../../sub-commands/config';
const subCommand = new Config();

const usage = 'Usage:\n  $0 config';

module.exports = {
  command: 'config',
  describe: 'Display current configuration',
  builder: yargs => yargs.usage(usage),
  handler: () => subCommand.run()
};
