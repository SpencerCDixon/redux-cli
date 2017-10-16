import getHandler from '../handler';
import { logYargs } from '../yargs';
import handlers from './generate/handlers';

getHandler().onRun('generate', handlers.handleRun);
getHandler().onHelp('generate', handlers.handleHelp);

const usage = `Generate:
  $0 generate <blueprint> <name>
  $0 help generate <blueprint>`;

module.exports = {
  command: 'generate <blueprint> <name>',
  aliases: ['g', 'gen'],
  describe: 'Generate project file(s) from a blueprint',
  builder: yargs =>
    yargs
      .usage(usage)
      .option('dry-run', {
        alias: 'd',
        describe: "List files but don't generate them",
        type: 'boolean'
      })
      .option('verbose', {
        alias: 'v',
        describe: 'Verbose output, including file contents',
        type: 'boolean'
      })
      .group(['dry-run', 'verbose', 'help'], 'Generate Options:')
      .strict(false) // ditch this if we '--' blueprint commands
      .exitProcess(false) // allow parse to fall through to cli/handler to emit
      .fail((msg = '', err = {} /*, yargs */) => { // deal with exit conditions
        // close over the the original yargs that was passed to builder rather
        // than use the 3rd parameter to fail as it doesn't support logYargs
        yargs.showHelp();

        let message = msg || err.message;

        message = message.replace(
          'Not enough non-option arguments: got 0, need at least 2',
          'Missing arguments <blueprint> and <name>'
        );
        message = message.replace(
          'Not enough non-option arguments: got 1, need at least 2',
          'Missing argument blueprint <name>'
        );

        logYargs(yargs, message);
      })
};
