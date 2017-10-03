import _merge from 'lodash/merge';
import _cloneDeep from 'lodash/cloneDeep';

import getEnvironment from '../../environment';
import Generate from '../../../sub-commands/generate';
import buildBlueprintCommand from './build-blueprint-command';

const loadBlueprintSettings = (blueprint, bp) =>
  (blueprint.settings = _merge(
    _cloneDeep(bp.common),
    _cloneDeep(bp[blueprint.name])
  ));

const buildBlueprintCommands = () => {
  const environment = getEnvironment();
  const subCommand = new Generate(environment);

  const { blueprints, settings: { bp = {} } } = environment.settings;

  return blueprints.generators().map(blueprint => {
    loadBlueprintSettings(blueprint, bp);
    return buildBlueprintCommand(blueprint, subCommand);
  });
};

export default buildBlueprintCommands;
