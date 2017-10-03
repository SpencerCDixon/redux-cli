import getParser from 'cli/parser';
import pkg from '../../package.json';
import { lineRegEx } from '../helpers/regex-utils';

let parser;

function testErrorMessage(opts, message) {
  test('shows error message', done => {
    parser.parse(opts, (err, argv, output) => {
      expect(err).to.have.property('message');
      expect(err.message).to.eql(message);
      expect(output).to.include(message);
      done();
    });
  });
}

function testShowsHelp(opts, description = 'shows help') {
  test(description, done => {
    parser.parse(opts, (err, argv, output) => {
      expect(output).to.include('Usage:');
      expect(output).to.include('Commands:');
      expect(output).to.include('Options:');
      done();
    });
  });
}

describe('(CLI) Parser', () => {
  beforeEach(() => {
    parser = getParser();
    parser.$0 = 'bp';
  });

  describe('no command', () => {
    testErrorMessage('', 'Provide a command to run');
    testShowsHelp('');
  });

  describe('unknown command', () => {
    testErrorMessage('gibberish', 'Unknown argument: gibberish');
    testShowsHelp('gibberish');
  });

  describe('nearly command', () => {
    xit('should suggest best command', () => {
      // yargs.recommendCommands() working in CLI but not in test setup
      // testErrorMessage('genrate', 'Did you mean generate?');
    });
    testShowsHelp('genrate');
  });

  describe('--version', () => {
    const testVersion = (opts, desc) => {
      test(desc, done => {
        parser.parse(opts, (err, argv, output) => {
          err = err || {};
          expect(err.message).to.be.undefined;
          expect(err).toEqual({});
          expect(output).to.eql(pkg.version);
          done();
        });
      });
    };

    testVersion('--version', 'returns package version');
    testVersion('-V', 'returns with -V alias');
  });

  describe('--help', () => {
    testShowsHelp('--help');
    testShowsHelp('-h', 'shows with -h alias');
    testShowsHelp('help', 'shows with help argument');

    describe('help content', () => {
      test('displays Usage', done => {
        parser.parse('', (err, argv, output) => {
          expect(output).to.include('Usage:');
          expect(output).to.include('bp <command> [arguments] [options]');
          expect(output).to.include('bp help <command>');
          done();
        });
      });

      test('displays Commands', done => {
        parser.parse('', (err, argv, output) => {
          expect(output).to.include('Commands:');
          done();
        });
      });

      test('displays generate command', done => {
        parser.parse('', (err, argv, output) => {
          expect(output).to.match(
            lineRegEx(
              'generate <blueprint> <name>',
              'Generate project file(s) from a blueprint',
              '[aliases: g, gen]'
            )
          );
          done();
        });
      });

      test('displays init command', done => {
        parser.parse('', (err, argv, output) => {
          expect(output).to.match(
            lineRegEx('init', 'Initialize .blueprintrc for the current project')
          );
          done();
        });
      });

      test('hides new command (in v2.0)', done => {
        parser.parse('', (err, argv, output) => {
          expect(output).to.not.match(
            lineRegEx(
              'new <project_name>',
              'Create a new blueprint-enabled project'
            )
          );
          done();
        });
      });

      test('displays Options', done => {
        parser.parse('', (err, argv, output) => {
          expect(output).to.include('Options:');
          expect(output).to.match(
            lineRegEx('--help, -h', 'Show help', '[boolean]')
          );
          expect(output).to.match(
            lineRegEx('--version, -V', 'Show version number', '[boolean]')
          );
          done();
        });
      });

      test('displays documentation epilogue', done => {
        parser.parse('', (err, argv, output) => {
          expect(output).to.match(
            lineRegEx(
              'Documentation: https://github.com/SpencerCDixon/redux-cli'
            )
          );
          done();
        });
      });
    });
  });
});
