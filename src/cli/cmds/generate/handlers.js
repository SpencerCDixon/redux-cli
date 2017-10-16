import buildBlueprintCommands from './build-blueprint-commands';
import { logYargs } from '../../yargs';

const handlers = {
  handleRun,
  handleHelp
};

export default handlers;

// INFO: helpers object support individual mocks for testing
export const helpers = {
  getBlueprintRunner,
  getBlueprintHelper,
  getBlueprintListHelper,
  getBlueprintCommands,
  getBlueprintCommand,
  logMissingBlueprint
};

function handleRun(argv, yargs, rawArgs = process.argv.slice(3)) {
  const blueprintRunner = helpers.getBlueprintRunner(yargs, argv.blueprint);
  if (blueprintRunner) {
    blueprintRunner.parse(rawArgs);
  }
}

function getBlueprintRunner(yargs, blueprintName) {
  const blueprintCommand = helpers.getBlueprintCommand(blueprintName);
  if (blueprintCommand) {
    return yargs
      .reset()
      .command(blueprintCommand)
      .exitProcess(true);
  } else {
    helpers.logMissingBlueprint(yargs, blueprintName);
  }
}

function handleHelp(argv, yargs) {
  const [_, blueprintName] = argv._;
  const helper = blueprintName
    ? helpers.getBlueprintHelper(yargs, blueprintName)
    : helpers.getBlueprintListHelper(yargs);

  if (helper) {
    helper.showHelp();
  }
}

function getBlueprintHelper(yargs, blueprintName) {
  const blueprintCommand = helpers.getBlueprintCommand(blueprintName);
  if (blueprintCommand) {
    blueprintCommand
      .builder(yargs)
      .updateStrings({ 'Options:': 'Blueprint Options:' });
    return yargs;
  } else {
    helpers.logMissingBlueprint(yargs, blueprintName);
  }
}

function getBlueprintListHelper(yargs) {
  return helpers
    .getBlueprintCommands()
    .reduce((yargs, command) => yargs.command(command), yargs)
    .updateStrings({ 'Commands:': 'Blueprints:' });
}

function getBlueprintCommands() {
  return buildBlueprintCommands();
}

function getBlueprintCommand(blueprintName) {
  return buildBlueprintCommands().find(
    command =>
      command.command.match(blueprintName) ||
      command.aliases.find(alias => alias === blueprintName)
  );
}

function logMissingBlueprint(yargs, blueprintName) {
  logYargs(yargs, `Unknown blueprint '${blueprintName}'`);
}
