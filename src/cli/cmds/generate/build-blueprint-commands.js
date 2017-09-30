import Blueprint from '../../../models/blueprint';
import Generate from '../../../sub-commands/generate';

import buildBlueprintCommand from './build-blueprint-command';

const subCommand = new Generate();

/*
  TODO: refactor to use new BlueprintCollection, should just
        be a simple map to buildBlueprintCommand
*/
const buildBlueprintCommands = () =>
  Blueprint.loadRunnable().map(blueprint => {
    loadBlueprintSettings(blueprint);
    return buildBlueprintCommand(blueprint, subCommand);
  });

export default buildBlueprintCommands;

const settings = subCommand.environment.settings.settings || {};
settings.bp = settings.bp || {};
const loadBlueprintSettings = blueprint => {
  const blueprintSettings = getBlueprintSettings(blueprint);
  blueprint.settings = blueprintSettings;
  return blueprintSettings;
};
const getBlueprintSettings = blueprint => ({
  ...settings.bp.common,
  ...settings.bp[blueprint.name]
});
