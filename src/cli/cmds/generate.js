import buildBlueprintCommands from './generate/build-blueprint-commands';

const usage = `Usage:
  $0 generate <blueprint> <name>
  $0 help generate <blueprint>`;

module.exports = {
  command: 'generate <blueprint> <name>',
  aliases: ['g', 'gen'],
  describe: 'Generate project file(s) from a blueprint',
  builder: yargs => {
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
      .updateStrings({
        'Commands:': 'Blueprints:',
        'Options:': 'Blueprint Options:'
      });
    return buildBlueprintCommands().reduce(
      (yargs, command) => yargs.command(command),
      yargs
    );
  },
  handler: argv => console.error(`Unrecognised blueprint '${argv.blueprint}'`)
};
