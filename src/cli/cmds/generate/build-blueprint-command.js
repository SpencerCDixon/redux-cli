/*
  Build a yargs command module object from options defined in the blueprint
  https://github.com/yargs/yargs/blob/master/docs/advanced.md#providing-a-command-module

  Target object structure:
  {
    command: 'blueprint <name>',
    aliases: [],
    describe: 'Generates a blueprint',
    builder: yargs => yargs,
    handler: argv => runner.run()
  }
*/
const buildBlueprintCommand = (blueprint, runner) => {
  // extract custom command pieces
  let {
    aliases = [],
    options,
    examples,
    epilog,
    epilogue,
    check,
    sanitize
  } = blueprint.command;

  // mandate the command name to guarantee name is passed to generate task
  let command = `${blueprint.name} <name>`;

  // alert the user to the prescense of options for the command
  if (options) {
    command = command + ' [options]';
  }

  // rc aliases override blueprint configuration
  aliases = [].concat(blueprint.settings.aliases || aliases);

  // default usage
  let usage = `Usage:\n  $0 generate ${command}`;
  aliases.forEach(
    alias =>
      (usage += `\n  $0 generate ${command.replace(blueprint.name, alias)}`)
  );

  // default options from settings
  if (options && blueprint.settings) {
    Object.keys(options).forEach(option => {
      if (blueprint.settings[option]) {
        options[option].default = blueprint.settings[option];
      }
    });
  }

  // alterate epilogue keys
  epilogue = epilogue || epilog;

  // builder brings together multiple customizations, whilst keeping the
  // options easy to parse for prompting in the init command
  const builder = yargs => {
    yargs.usage(usage).strict(false); // allow undocumented options through

    if (options) yargs.options(options);
    if (check) yargs.check(check, false);
    if (examples) {
      [].concat(examples).forEach(example => yargs.example(example));
    }
    if (epilogue) yargs.epilogue(epilogue);

    return yargs;
  };

  // handler runs the generate blueprint task
  const handler = argv => {
    // merge command line options into rc options
    let options = { ...blueprint.settings, ...argv };

    // tidy up options before passing them on so that all hooks have access
    // to the clean version
    if (sanitize) options = sanitize(options);

    const cliArgs = {
      entity: {
        name: argv.name,
        options,
        rawArgs: argv
      },
      debug: argv.verbose || false,
      dryRun: argv.dryRun || false
    };
    runner.run(blueprint.name, cliArgs);
  };

  return {
    command,
    aliases,
    describe: blueprint.description(),
    builder,
    handler
  };
};

export default buildBlueprintCommand;
