import getParser from 'cli/parser';
import { lineRegEx } from '../../helpers/regex-utils';
import New from 'sub-commands/new';

jest.mock('sub-commands/new');

describe('(CLI) New', () => {
  let parser;

  beforeEach(() => {
    parser = getParser();
    parser.$0 = 'bp';
  });

  describe('--help', () => {
    test('shows Usage', done => {
      parser.parse('help new', (err, argv, output) => {
        expect(err).to.be.undefined;
        expect(output).to.include('Usage:');
        expect(output).to.match(lineRegEx('bp new <project_name>'));
        expect(output).to.match(
          lineRegEx('Create a new project from react-redux-starter-kit')
        );
        done();
      });
    });

    describe('shows Options', () => {
      test('--use-ssh', done => {
        parser.parse('new --help', (err, argv, output) => {
          expect(output).to.match(
            lineRegEx(
              '--use-ssh, -S',
              'Fetch starter kit over ssh',
              '[boolean]'
            )
          );
          done();
        });
      });
      test('--use-boilerplate', done => {
        parser.parse('new --h', (err, argv, output) => {
          expect(output).to.match(
            lineRegEx(
              '--use-boilerplate, -B',
              'Create from redux-cli-boilerplate',
              '[boolean]'
            )
          );
          done();
        });
      });
      test('--use-uikit', done => {
        parser.parse('help new', (err, argv, output) => {
          expect(output).to.match(
            lineRegEx(
              '--use-uikit, -U',
              'Create from redux-cli-ui-kit-boilerplate',
              '[boolean]'
            )
          );
          done();
        });
      });

      test("doesn't include --version", done => {
        parser.parse('help new', (err, argv, output) => {
          expect(output).to.not.include('--version, -V');
          done();
        });
      });
    });
  });

  describe('checks options', () => {
    test('requires <project_name>', done => {
      parser.parse('new', err => {
        expect(err).to.be.instanceof(Object);
        expect(err.message).toEqual(
          'Not enough non-option arguments: got 0, need at least 1'
        );
        done();
      });
    });

    test('refuses unknown argument', done => {
      parser.parse('new test_project --gibberish', err => {
        expect(err).to.be.instanceof(Object);
        expect(err.message).toEqual('Unknown argument: gibberish');
        done();
      });
    });

    test('-B and -U are mutually exclusive', done => {
      parser.parse('new test_project -BU', err => {
        expect(err).to.be.instanceof(Object);
        expect(err.message).toEqual(
          'Only specify one of --use-boilerplate or --use-uikit'
        );
        done();
      });
    });
  });

  describe('handler', () => {
    let runMock;

    beforeEach(() => {
      expect(New.mock.instances.length).toEqual(1);
      runMock = New.mock.instances[0].run;
      runMock.mockReset();
    });

    test('passes dirName to subCommand', done => {
      parser.parse('new proj', (err, argv, output) => {
        expect(runMock.mock.calls.length).toEqual(1);
        expect(runMock.mock.calls[0]).toEqual([
          {
            dirName: 'proj',
            useSsh: false,
            useBoilerplate: false,
            useUIKit: false
          }
        ]);
        expect(output).toEqual('');
        done();
      });
    });

    test('passes useSsh to subCommand', done => {
      parser.parse('new proj --use-ssh', (err, argv, output) => {
        expect(runMock.mock.calls.length).toEqual(1);
        expect(runMock.mock.calls[0]).toEqual([
          {
            dirName: 'proj',
            useSsh: true,
            useBoilerplate: false,
            useUIKit: false
          }
        ]);
        expect(output).toEqual('');
        done();
      });
    });

    test('passes useBoilerplate to subCommand', done => {
      parser.parse('new proj --use-boilerplate', (err, argv, output) => {
        expect(runMock.mock.calls.length).toEqual(1);
        expect(runMock.mock.calls[0]).toEqual([
          {
            dirName: 'proj',
            useSsh: false,
            useBoilerplate: true,
            useUIKit: false
          }
        ]);
        expect(output).toEqual('');
        done();
      });
    });

    test('passes useUIKit to subCommand', done => {
      parser.parse('new proj --use-uikit', (err, argv, output) => {
        expect(runMock.mock.calls.length).toEqual(1);
        expect(runMock.mock.calls[0]).toEqual([
          {
            dirName: 'proj',
            useSsh: false,
            useBoilerplate: false,
            useUIKit: true
          }
        ]);
        expect(output).toEqual('');
        done();
      });
    });
  });
});
