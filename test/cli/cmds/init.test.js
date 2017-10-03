import getParser from 'cli/parser';
import { lineRegEx } from '../../helpers/regex-utils';
import Init from 'sub-commands/init';

jest.mock('sub-commands/init');

describe('(CLI) Init', () => {
  let parser;

  beforeEach(() => {
    parser = getParser();
    parser.$0 = 'bp';
  });

  describe('--help', () => {
    test('shows Usage', done => {
      parser.parse('help init', (err, argv, output) => {
        expect(err).to.be.undefined;
        expect(output).to.include('Usage:');
        expect(output).to.match(lineRegEx('bp init'));
        done();
      });
    });

    test("doesn't include --version", done => {
      parser.parse('help init', (err, argv, output) => {
        expect(output).to.not.include('--version, -V');
        done();
      });
    });
  });

  describe('handler', () => {
    test('runs subCommand without arguments', done => {
      parser.parse('init', (err, argv, output) => {
        expect(Init.mock.instances.length).toEqual(1);
        expect(Init.mock.instances[0].run.mock.calls.length).toEqual(1);
        expect(Init.mock.instances[0].run.mock.calls[0]).toEqual([]);
        expect(output).toEqual('');
        done();
      });
    });
  });
});
