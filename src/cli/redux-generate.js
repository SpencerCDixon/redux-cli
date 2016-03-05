import commander from 'commander';
import { version } from '../version';
import Generate from '../sub-commands/generate';
import minimist from 'minimist';

const subCommand = new Generate();

commander.on('--help', () => {
  subCommand.printUserHelp();
});

commander
  .version(version())
  .arguments('<blueprint> [entity name]')
  .option('-d, --debug', 'Turn debug mode on')
  .description('generates code based off a blueprint')
  .action((blueprintName, entityName, command) => {
    const debug = command.debug;
    const rawArgs = command.rawArgs;
    const options = minimist(rawArgs.slice(2));

    const cliArgs = {
      entity: {
        name: entityName,
        options,
        rawArgs
      },
      debug
    };
    subCommand.run(blueprintName, cliArgs);

    /*
     * blueprint arg structure:
     * redux g dumb MyComponent --html=div
     * {
     *  entity: {
     *    name: 'foo',
     *    options: {
     *      _: [ 'dumb', 'MyComponent' ],
     *      html: 'div'
     *    },
     *    rawArgs: [
     *      '/Users/spencerdixon/.nvm/versions/node/v5.1.0/bin/node',
            '/Users/spencerdixon/.nvm/versions/node/v5.1.0/bin/redux-g',
            'dumb',
            'MyComponent',
            '--html',
            'div'
     *    ]
     *  },
     * }
     */
  })
  .parse(process.argv);


