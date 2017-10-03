import yargs from 'yargs/yargs';

const usage = `Usage:
  $0 <command> [arguments] [options]
  $0 help <command>`;

export default function getParser() {
  const parser = yargs();
  return parser
    .usage(usage)
    .commandDir('cmds')
    .demandCommand(1, 'Provide a command to run')
    .recommendCommands()
    .strict()
    .help()
    .alias('help', 'h')
    .version()
    .alias('version', 'V')
    .global('version', false)
    .epilogue('Documentation: https://github.com/SpencerCDixon/redux-cli')
    .wrap(parser.terminalWidth());
}
