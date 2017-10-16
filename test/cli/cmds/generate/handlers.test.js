import Yargs from 'yargs/yargs';
import handlers, { helpers } from 'cli/cmds/generate/handlers';
import buildBlueprintCommands from 'cli/cmds/generate/build-blueprint-commands';
import getYargs, { logYargs } from 'cli/yargs';
import { lineRegEx } from '../../../helpers/regex-utils';

jest.mock('cli/cmds/generate/build-blueprint-commands');
jest.mock('cli/yargs');

const blueprintCommand = {
  command: 'blueprint <name> [options]',
  aliases: ['bp'],
  describe: 'Generate a blueprint with specified hooks',
  builder: yargs =>
    yargs.options({
      description: { description: 'Override default description' }
    }),
  handler: jest.fn()
};

const duckCommand = {
  command: 'duck <name> [options]',
  aliases: [],
  describe: 'Generate a duck with types and action handlers',
  builder: yargs =>
    yargs.options({
      types: { description: 'Specify ACTION_TYPE constants', type: 'array' }
    }),
  handler: jest.fn()
};

const blueprintCommands = [blueprintCommand, duckCommand];

buildBlueprintCommands.mockImplementation(() => blueprintCommands);

describe('(CLI) Generate Handlers', () => {
  describe('#handlers.handleRun', () => {
    let parse = jest.fn();

    beforeEach(() => {
      jest.spyOn(helpers, 'getBlueprintRunner').mockImplementation(() => ({
        parse
      }));
      parse.mockReset();
    });
    afterEach(() => {
      helpers.getBlueprintRunner.mockRestore();
    });

    test('gets blueprint runner', () => {
      const yargs = {};
      const argv = { blueprint: 'testing' };
      handlers.handleRun(argv, yargs);
      expect(helpers.getBlueprintRunner).toHaveBeenCalled();
      expect(helpers.getBlueprintRunner.mock.calls[0][0]).toBe(yargs);
      expect(helpers.getBlueprintRunner.mock.calls[0][1]).toBe('testing');
    });
    test('parses rawArgs with blueprint runner', () => {
      const yargs = {};
      const argv = { blueprint: 'testing' };
      handlers.handleRun(argv, yargs);
      expect(parse).toHaveBeenCalled();
      expect(parse.mock.calls[0][0]).toEqual(process.argv.slice(3));
    });
    test('ignores unknown blueprint', () => {
      const yargs = {};
      const argv = { blueprint: 'testing' };
      const rawArgs = { callMe: false };
      helpers.getBlueprintRunner.mockImplementation(() => undefined);
      handlers.handleRun(argv, yargs, rawArgs);
      expect(parse).not.toHaveBeenCalled();
    });
  });

  describe('#handlers.handleHelp', () => {
    let showHelp = jest.fn();

    beforeEach(() => {
      jest.spyOn(helpers, 'getBlueprintHelper').mockImplementation(() => ({
        showHelp
      }));
      jest.spyOn(helpers, 'getBlueprintListHelper').mockImplementation(() => ({
        showHelp
      }));
      showHelp.mockReset();
    });
    afterEach(() => {
      helpers.getBlueprintHelper.mockRestore();
      helpers.getBlueprintListHelper.mockRestore();
    });

    test('gets blueprint list helper', () => {
      const yargs = {};
      const argv = { _: ['generate'] };
      handlers.handleHelp(argv, yargs);
      expect(helpers.getBlueprintHelper).not.toHaveBeenCalled();
      expect(helpers.getBlueprintListHelper).toHaveBeenCalled();
      expect(helpers.getBlueprintListHelper.mock.calls[0][0]).toBe(yargs);
      expect(showHelp).toHaveBeenCalled();
    });
    test('gets blueprint helper', () => {
      const yargs = {};
      const argv = { _: ['generate', 'blueprint_name'] };
      handlers.handleHelp(argv, yargs);
      expect(helpers.getBlueprintListHelper).not.toHaveBeenCalled();
      expect(helpers.getBlueprintHelper).toHaveBeenCalled();
      expect(helpers.getBlueprintHelper.mock.calls[0][0]).toBe(yargs);
      expect(helpers.getBlueprintHelper.mock.calls[0][1]).toBe(
        'blueprint_name'
      );
      expect(showHelp).toHaveBeenCalled();
    });
    test('ignores unknown blueprint', () => {
      const yargs = {};
      const argv = { _: ['generate', 'unknown_blueprint_name'] };
      helpers.getBlueprintHelper.mockImplementation(() => undefined);
      handlers.handleHelp(argv, yargs);
      expect(helpers.getBlueprintListHelper).not.toHaveBeenCalled();
      expect(helpers.getBlueprintHelper).toHaveBeenCalled();
      expect(showHelp).not.toHaveBeenCalled();
    });
  });

  describe('#helpers.getBlueprintRunner', () => {
    beforeEach(() => {
      jest
        .spyOn(helpers, 'logMissingBlueprint')
        .mockImplementation(() => undefined);
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
    });
    afterEach(() => {
      helpers.logMissingBlueprint.mockRestore();
      console.error.mockRestore();
    });

    test('returns runnable blueprint', done => {
      const yargs = Yargs();
      const runner = helpers.getBlueprintRunner(yargs, 'blueprint');
      expect(runner).toBe(yargs);
      runner.parse('blueprint testable', (err, argv, output) => {
        expect(blueprintCommand.handler).toHaveBeenCalled();
        done();
      });
    });

    test('logs unknown blueprint', () => {
      const yargs = Yargs();
      const helper = helpers.getBlueprintRunner(yargs, 'unrunnable');
      expect(helpers.logMissingBlueprint).toHaveBeenCalled();
      expect(helpers.logMissingBlueprint.mock.calls[0][0]).toBe(yargs);
      expect(helpers.logMissingBlueprint.mock.calls[0][1]).toBe('unrunnable');
    });
  });

  describe('#helpers.getBlueprintHelper', () => {
    beforeEach(() => {
      jest
        .spyOn(helpers, 'logMissingBlueprint')
        .mockImplementation(() => undefined);
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
    });
    afterEach(() => {
      helpers.logMissingBlueprint.mockRestore();
      console.error.mockRestore();
    });

    test('builds help for blueprint', () => {
      const yargs = Yargs();
      const helper = helpers.getBlueprintHelper(yargs, 'duck');
      helper.showHelp();
      expect(console.error).toHaveBeenCalled();
      const help = console.error.mock.calls[0][0];
      expect(help).toMatch(lineRegEx('Blueprint Options:'));
      expect(help).toMatch(
        lineRegEx('--types', 'Specify ACTION_TYPE constants', '[array]')
      );
    });

    test('logs unknown blueprint', () => {
      const yargs = Yargs();
      const helper = helpers.getBlueprintHelper(yargs, 'existential');
      expect(helpers.logMissingBlueprint).toHaveBeenCalled();
      expect(helpers.logMissingBlueprint.mock.calls[0][0]).toBe(yargs);
      expect(helpers.logMissingBlueprint.mock.calls[0][1]).toBe('existential');
    });
  });

  describe('#helpers.getBlueprintListHelper', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
    });
    afterEach(() => {
      console.error.mockRestore();
    });

    test('builds help for all blueprint commands', () => {
      const yargs = Yargs();
      const helper = helpers.getBlueprintListHelper(yargs);
      helper.showHelp();
      expect(console.error).toHaveBeenCalled();
      const help = console.error.mock.calls[0][0];
      expect(help).toMatch(lineRegEx('Blueprints:'));
      expect(help).toMatch(
        lineRegEx(
          'blueprint <name> [options]',
          'Generate a blueprint with specified hooks',
          '[aliases: bp]'
        )
      );
      expect(help).toMatch(
        lineRegEx(
          'duck <name> [options]',
          'Generate a duck with types and action handlers'
        )
      );
    });
  });

  describe('#helpers.getBlueprintCommands', () => {
    test('returns array of blueprint commands', () => {
      const actualCommands = helpers.getBlueprintCommands();
      expect(buildBlueprintCommands).toHaveBeenCalled();
      expect(actualCommands).toBe(blueprintCommands);
    });
  });

  describe('#helpers.getBlueprintCommand', () => {
    test('returns existing command', () => {
      const actualCommand = helpers.getBlueprintCommand('duck');
      expect(buildBlueprintCommands).toHaveBeenCalled();
      expect(actualCommand).toBe(duckCommand);
    });
    test('returns existing command by alias', () => {
      const actualCommand = helpers.getBlueprintCommand('bp');
      expect(buildBlueprintCommands).toHaveBeenCalled();
      expect(actualCommand).toBe(blueprintCommand);
    });
    test('returns undefined for unknown blueprint', () => {
      const actualCommand = helpers.getBlueprintCommand('no_idea');
      expect(buildBlueprintCommands).toHaveBeenCalled();
      expect(actualCommand).toBe(undefined);
    });
  });

  describe('#helpers.logMissingBlueprint', () => {
    test('logYargs unknown blueprint', () => {
      const yargs = {};
      const blueprintName = 'i_am_missing';
      helpers.logMissingBlueprint(yargs, blueprintName);
      expect(logYargs).toHaveBeenCalled();
      expect(logYargs.mock.calls[0][0]).toBe(yargs);
      expect(logYargs.mock.calls[0][1]).toEqual(
        "Unknown blueprint 'i_am_missing'"
      );
    });
  });
});
