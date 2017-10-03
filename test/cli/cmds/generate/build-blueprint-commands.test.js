import buildBlueprintCommands from 'cli/cmds/generate/build-blueprint-commands';
import buildBlueprintCommand from 'cli/cmds/generate/build-blueprint-command';
import getEnvironment from 'cli/environment';

jest.mock('cli/environment');
jest.mock('cli/cmds/generate/build-blueprint-command');

const deepOption = { isDeep: true };
const mockEnvironment = {
  settings: {
    blueprints: {
      generators() {
        return [{ name: 'specific' }, { name: 'nooption' }];
      }
    },
    settings: {
      bp: {
        common: {
          overridden: false,
          keep: true
        },
        specific: {
          overridden: true,
          uncommon: deepOption
        }
      }
    }
  }
};

getEnvironment.mockImplementation(() => mockEnvironment);
buildBlueprintCommand.mockImplementation(blueprint => blueprint);

describe('(CLI) #buildBlueprintCommands', () => {
  it('returns array of objects', () => {
    const blueprintCommands = buildBlueprintCommands();
    expect(blueprintCommands).toBeInstanceOf(Array);
    expect(blueprintCommands[0]).toBeInstanceOf(Object);
  });
  it('builds command for each of environment.settings.blueprints.generators()', () => {
    const blueprintCommands = buildBlueprintCommands();
    expect(blueprintCommands.length).toBe(2);
    expect(blueprintCommands.map(cmd => cmd.name)).toEqual([
      'specific',
      'nooption'
    ]);
  });
  it('assigns bp.common to blueprint.settings', () => {
    const blueprintCommands = buildBlueprintCommands();
    const nooption = blueprintCommands[1];
    expect(nooption.settings).toEqual(
      mockEnvironment.settings.settings.bp.common
    );
  });
  it('clones bp.common before assigning to blueprint.settings', () => {
    const blueprintCommands = buildBlueprintCommands();
    const nooption = blueprintCommands[1];
    expect(nooption.settings).not.toBe(
      mockEnvironment.settings.settings.bp.common
    );
  });
  it('merges bp.specific into bp.common and assigns to blueprint.settings', () => {
    const blueprintCommands = buildBlueprintCommands();
    const specific = blueprintCommands[0];
    expect(specific.settings).toEqual({
      overridden: true,
      keep: true,
      uncommon: deepOption
    });
  });
  it('clones bp.specific before merging and assigning to blueprint.settings', () => {
    const blueprintCommands = buildBlueprintCommands();
    const specific = blueprintCommands[0];
    expect(specific.settings.uncommon).not.toBe(deepOption);
  });
});
