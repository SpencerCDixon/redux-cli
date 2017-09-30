import yargs from 'yargs/yargs';

import { default as generate } from 'cli/cmds/generate';
import { lineRegEx } from '../../helpers/regex-utils';

import buildBlueprintCommands from 'cli/cmds/generate/build-blueprint-commands';

jest.mock('cli/cmds/generate/build-blueprint-commands');

const blueprintCommand = {
  command: 'blueprint <name> [options]',
  aliases: ['bp'],
  describe: 'Generate a blueprint with specified hooks',
  builder: yargs => yargs.options({ foo: { description: 'Set foo' } }),
  handler: jest.fn()
};

buildBlueprintCommands.mockImplementation(() => [blueprintCommand]);

describe('(CLI) Generate', () => {
  let parser;

  beforeEach(() => {
    parser = yargs().global('version', false);
    parser.$0 = 'bp';
  });

  const buildParser = () => parser.command(generate);

  describe('help generate', () => {
    test('shows Usage', done => {
      buildParser().parse('help generate', (err, argv, output) => {
        expect(output).to.match(lineRegEx('Usage:'));
        expect(output).to.match(lineRegEx('bp generate <blueprint> <name>'));
        expect(output).to.match(lineRegEx('bp help generate <blueprint>'));
        expect(buildBlueprintCommands).toHaveBeenCalled();
        done();
      });
    });
    test('shows Generate Options', done => {
      buildParser().parse('help generate', (err, argv, output) => {
        expect(output).to.match(lineRegEx('Generate Options:'));
        expect(output).to.match(
          lineRegEx(
            '--dry-run, -d',
            "List files but don't generate them",
            '[boolean]'
          )
        );
        expect(output).to.match(
          lineRegEx(
            '--verbose, -v',
            'Verbose output, including file contents',
            '[boolean]'
          )
        );
        expect(buildBlueprintCommands).toHaveBeenCalled();
        done();
      });
    });

    test('calls buildBlueprintCommands', done => {
      buildParser().parse('help generate', () => {
        expect(buildBlueprintCommands).toHaveBeenCalled();
        done();
      });
    });
    test('lists Blueprints', done => {
      buildParser().parse('help generate', (err, argv, output) => {
        expect(output).to.match(lineRegEx('Generate Options:'));
        expect(output).to.match(
          lineRegEx(
            'blueprint <name> [options]',
            'Generate a blueprint with specified hooks',
            '[aliases: bp]'
          )
        );
        done();
      });
    });
  });

  describe('help generate <blueprint>', () => {
    test('shows Blueprint Options', done => {
      buildParser().parse('help generate blueprint', (err, argv, output) => {
        expect(output).to.match(lineRegEx('Blueprint Options:'));
        expect(output).to.match(lineRegEx('--foo', 'Set foo'));
        done();
      });
    });
  });

  describe('generate <blueprint>', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      spy.mockRestore();
    });
    test('demands <blueprint> and <name>', done => {
      buildParser().parse('generate blueprint', err => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toEqual(
          'Not enough non-option arguments: got 0, need at least 1'
        );
        done();
      });
    });
    test('notifies of unknown <blueprint> command', done => {
      buildParser().parse('generate foo bar', () => {
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith("Unrecognised blueprint 'foo'");
        done();
      });
    });
    test('runs <blueprint> command', done => {
      buildParser().parse('generate blueprint foo', () => {
        expect(blueprintCommand.handler).toHaveBeenCalled();
        done();
      });
    });
  });
});
