import yargs from 'yargs/yargs';
import buildBlueprintCommand from 'cli/cmds/generate/build-blueprint-command';
import { lineRegEx } from '../../../helpers/regex-utils';

describe('(CLI) buildBlueprintCommand', () => {
  let blueprint;
  let subCommand;
  let run;

  beforeEach(() => {
    blueprint = {
      name: 'test_blueprint',
      description: function() {
        return 'test description';
      },
      command: {},
      settings: {}
    };
    run = jest.fn();
    subCommand = { run };
  });

  test('returns a yargs command object', () => {
    const command = buildBlueprintCommand(blueprint, subCommand);
    expect(Object.keys(command).sort()).toEqual(
      ['command', 'aliases', 'describe', 'builder', 'handler'].sort()
    );
  });

  describe('.command', () => {
    test('built from blueprint name', () => {
      const command = buildBlueprintCommand(blueprint, subCommand);
      expect(command.command).toEqual('test_blueprint <name>');
    });
    test('adds [options] when blueprint.command.options provided', () => {
      blueprint.command = {};
      blueprint.command.options = { foo: {} };
      const command = buildBlueprintCommand(blueprint, subCommand);
      expect(command.command).toEqual('test_blueprint <name> [options]');
    });
  });

  describe('.describe', () => {
    test('uses Blueprint#description()', () => {
      const command = buildBlueprintCommand(blueprint, subCommand);
      expect(command.describe).toEqual(blueprint.description());
    });
  });

  describe('.aliases', () => {
    test('defaults to empty array', () => {
      const command = buildBlueprintCommand(blueprint, subCommand);
      expect(command.aliases).toEqual([]);
    });
    test('adds single alias from blueprint', () => {
      blueprint.command.aliases = 'lone';
      const command = buildBlueprintCommand(blueprint, subCommand);
      expect(command.aliases).toEqual(['lone']);
    });
    test('adds alias array from blueprint', () => {
      blueprint.command.aliases = ['one', 'two'];
      const command = buildBlueprintCommand(blueprint, subCommand);
      expect(command.aliases).toEqual(['one', 'two']);
    });
    test('adds single alias from blueprint settings', () => {
      blueprint.settings.aliases = 'lone';
      const command = buildBlueprintCommand(blueprint, subCommand);
      expect(command.aliases).toEqual(['lone']);
    });
    test('adds alias array from blueprint settings', () => {
      blueprint.settings.aliases = ['one', 'two'];
      const command = buildBlueprintCommand(blueprint, subCommand);
      expect(command.aliases).toEqual(['one', 'two']);
    });
    test('overrides blueprint alias with settings', () => {
      blueprint.command.aliases = ['command'];
      blueprint.settings.aliases = 'settings';
      const command = buildBlueprintCommand(blueprint, subCommand);
      expect(command.aliases).toEqual(['settings']);
    });
  });

  describe('.builder', () => {
    let parser;

    beforeEach(() => {
      parser = yargs();
      parser.$0 = 'bp';
    });

    const buildParser = () =>
      buildBlueprintCommand(blueprint, subCommand).builder(parser);

    test('returns builder function', () => {
      const command = buildBlueprintCommand(blueprint, subCommand);
      expect(command.builder).toBeInstanceOf(Function);
    });

    describe('Usage', () => {
      test('built from command', done => {
        buildParser().parse('help', (err, argv, output) => {
          expect(output).to.include('Usage:');
          expect(output).to.include('bp generate test_blueprint <name>');
          expect(output).to.not.include('[options]');
          done();
        });
      });
      test('includes [options]', done => {
        blueprint.command.options = {};
        buildParser().parse('help', (err, argv, output) => {
          expect(output).to.include('Usage:');
          expect(output).to.include(
            'bp generate test_blueprint <name> [options]'
          );
          done();
        });
      });
      test('includes aliases', done => {
        blueprint.command.options = {};
        blueprint.command.aliases = ['foo', 'bar'];
        buildParser().parse('help', (err, argv, output) => {
          expect(output).to.include('Usage:');
          expect(output).to.include(
            'bp generate test_blueprint <name> [options]'
          );
          expect(output).to.include('bp generate foo <name> [options]');
          expect(output).to.include('bp generate bar <name> [options]');
          done();
        });
      });
    });

    describe('Options', () => {
      test('built from command', done => {
        blueprint.command.options = {
          foo: { description: 'Enable foo', type: 'boolean' },
          bar: { alias: 'b', description: 'Specify bar', type: 'string' }
        };
        buildParser().parse('help', (err, argv, output) => {
          expect(output).to.include('Options:');
          expect(output).to.match(
            lineRegEx('--foo', 'Enable foo', '[boolean]')
          );
          expect(output).to.match(
            lineRegEx('--bar, -b', 'Specify bar', '[string]')
          );
          done();
        });
      });
      test('defaulted from settings', done => {
        blueprint.command.options = {
          fizz: { description: 'Enable fizz', type: 'boolean' },
          buzz: { alias: 'b', description: 'Specify buzz', type: 'string' }
        };
        blueprint.settings = {
          fizz: true
        };
        buildParser().parse('help', (err, argv, output) => {
          expect(output).to.include('Options:');
          expect(output).to.match(
            lineRegEx('--fizz', 'Enable fizz', '[boolean]', '[default: true]')
          );
          expect(output).to.match(
            lineRegEx('--buzz, -b', 'Specify buzz', '[string]')
          );
          done();
        });
      });
    });

    describe('#check', () => {
      let check;

      test('called during parsing', done => {
        blueprint.command = {
          check: (check = jest.fn(() => true))
        };
        buildParser().parse('', () => {
          expect(check).toHaveBeenCalled();
          done();
        });
      });
      test('halts parsing if check fails', done => {
        blueprint.command = {
          check: (check = jest.fn(() => {
            throw new Error('check failed');
          }))
        };
        buildParser().parse('', (err, argv, output) => {
          expect(check).toHaveBeenCalled();
          expect(err.message).toEqual('check failed');
          expect(output).to.contain('check failed');
          done();
        });
      });
    });

    describe('Examples', () => {
      test('displays single example', done => {
        blueprint.command = {
          examples: 'this is how to do it'
        };
        buildParser().parse('help', (err, argv, output) => {
          expect(output).to.contain('Examples:');
          expect(output).to.contain('this is how to do it');
          done();
        });
      });
      test('displays array of examples', done => {
        blueprint.command = {
          examples: ['this is how to do it', 'or this']
        };
        buildParser().parse('help', (err, argv, output) => {
          expect(output).to.contain('Examples:');
          expect(output).to.contain('this is how to do it');
          expect(output).to.contain('or this');
          done();
        });
      });
    });

    describe('Epilogue', () => {
      test('displays epilogue', done => {
        blueprint.command = {
          epilogue: 'See the manual for more details'
        };
        buildParser().parse('help', (err, argv, output) => {
          expect(output).to.contain('See the manual for more details');
          done();
        });
      });
      test('displays epilog alias', done => {
        blueprint.command = {
          epilog: 'Alias is working'
        };
        buildParser().parse('help', (err, argv, output) => {
          expect(output).to.contain('Alias is working');
          done();
        });
      });
    });
  });

  describe('.handler', () => {
    test('returns handler function', () => {
      const command = buildBlueprintCommand(blueprint, subCommand);
      expect(command.handler).toBeInstanceOf(Function);
    });

    const callHandler = argv =>
      buildBlueprintCommand(blueprint, subCommand).handler(argv);

    describe('#sanitize', () => {
      let sanitize;

      beforeEach(() => {
        sanitize = jest.fn(argv => argv);
        blueprint.command.sanitize = sanitize;
      });

      test('called by handler if provided', () => {
        callHandler({});
        expect(sanitize).toHaveBeenCalled();
        expect(sanitize.mock.calls.length).toEqual(1);
      });
      test('passed argv', () => {
        const argv = { foo: 'bar' };
        callHandler(argv);
        expect(sanitize.mock.calls[0].length).toEqual(1);
        expect(sanitize.mock.calls[0][0]).toEqual(argv);
      });
      test('passed argv merged into settings', () => {
        blueprint.settings = { foo: 'bar', fizz: 'buzz' };
        const argv = { foo: 'baz' };
        const merged = { foo: 'baz', fizz: 'buzz' };
        callHandler(argv);
        expect(sanitize.mock.calls[0].length).toEqual(1);
        expect(sanitize.mock.calls[0][0]).toEqual(merged);
      });
    });

    describe('calls subCommand.run', () => {
      test('with 2 parameters', () => {
        callHandler({});
        expect(run).toHaveBeenCalled();
        expect(run.mock.calls.length).toEqual(1);
        expect(run.mock.calls[0].length).toEqual(2);
      });
      test('1st parameter is blueprint.name', () => {
        callHandler({});
        expect(run.mock.calls[0][0]).toEqual(blueprint.name);
      });
      test('2nd parameter is object in cliArgs format', () => {
        callHandler({});
        const parameter = run.mock.calls[0][1];
        expect(Object.keys(parameter).sort()).toEqual(
          ['entity', 'dryRun', 'debug'].sort()
        );
        const entity = parameter.entity;
        expect(Object.keys(entity).sort()).toEqual(
          ['name', 'options', 'rawArgs'].sort()
        );
      });
      test('cliArgs.entity.name passed <name>', () => {
        callHandler({ name: 'test_entity_name' });
        const entity = run.mock.calls[0][1].entity;
        expect(entity.name).toEqual('test_entity_name');
      });
      test('cliArgs.entity.options passed argv', () => {
        const argv = { name: 'test_entity_name', foo: 'bar' };
        callHandler(argv);
        const entity = run.mock.calls[0][1].entity;
        expect(entity.options).toEqual(argv);
      });
      test('cliArgs.entity.options passed argv merged into settings', () => {
        blueprint.settings = { foo: 'bar', fizz: 'buzz' };
        const argv = { name: 'test_entity_name', foo: 'baz' };
        const merged = { name: 'test_entity_name', foo: 'baz', fizz: 'buzz' };
        callHandler(argv);
        const entity = run.mock.calls[0][1].entity;
        expect(entity.options).toEqual(merged);
      });
      test('cliArgs.entity.rawArgs passed argv', () => {
        const argv = { name: 'test_entity_name', foo: 'bar' };
        callHandler(argv);
        const entity = run.mock.calls[0][1].entity;
        expect(entity.rawArgs).toEqual(argv);
      });
      test('cliArgs.entity.rawArgs does not include settings', () => {
        blueprint.settings = { foo: 'bar', fizz: 'buzz' };
        const argv = { name: 'test_entity_name', foo: 'baz' };
        callHandler(argv);
        const entity = run.mock.calls[0][1].entity;
        expect(entity.rawArgs).toEqual(argv);
      });
      test('cliArgs.dryRun true when --dry-run', () => {
        callHandler({ dryRun: true });
        const cliArgs = run.mock.calls[0][1];
        expect(cliArgs.dryRun).toBe(true);
      });
      test('cliArgs.dryRun false when not --dry-run', () => {
        callHandler({ dryRun: undefined });
        const cliArgs = run.mock.calls[0][1];
        expect(cliArgs.dryRun).toBe(false);
      });
      test('cliArgs.debug true when --verbose', () => {
        callHandler({ verbose: true });
        const cliArgs = run.mock.calls[0][1];
        expect(cliArgs.debug).toBe(true);
      });
      test('cliArgs.debug false when not --verbose', () => {
        callHandler({ verbose: false });
        const cliArgs = run.mock.calls[0][1];
        expect(cliArgs.debug).toBe(false);
      });
    });
  });
});
