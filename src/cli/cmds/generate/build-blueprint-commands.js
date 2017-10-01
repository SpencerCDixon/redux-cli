import Generate from '../../../sub-commands/generate';

import buildBlueprintCommand from './build-blueprint-command';

const subCommand = new Generate();

const settings = subCommand.environment.settings.settings || {};
const blueprints = subCommand.environment.settings.blueprints;
settings.bp = settings.bp || {};

const buildBlueprintCommands = () =>
  blueprints.generators().map(blueprint => {
    loadBlueprintSettings(blueprint);
    return buildBlueprintCommand(blueprint, subCommand);
  });

export default buildBlueprintCommands;

const loadBlueprintSettings = blueprint => {
  const blueprintSettings = getBlueprintSettings(blueprint);
  blueprint.settings = blueprintSettings;
  return blueprintSettings;
};
const getBlueprintSettings = blueprint => ({
  ...settings.bp.common,
  ...settings.bp[blueprint.name]
});
