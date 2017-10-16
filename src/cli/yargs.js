import Yargs from 'yargs/yargs';

export default function getYargs() {
  return resetYargs(Yargs());
}

export function resetYargs(yargs) {
  return yargs
    .reset()
    .help(false)
    .version(false)
    .exitProcess(true)
    .wrap(yargs.terminalWidth());
}

/*
  This is using a private method of yargs that it probably shouldn't.
  Primarily for testing, so that the message is included in the output parameter
  of yargs.parse(argv, (err, argv, output) => {}).

  If it's ever an issue it can be swapped out for a simple console.error.
*/
export function logYargs(yargs, message) {
  if (message) {
    yargs._getLoggerInstance().error(message);
  }
}
