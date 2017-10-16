import yargs from 'yargs/yargs';

import { default as generate } from 'cli/cmds/generate';
import { lineRegEx } from '../../helpers/regex-utils';

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
        expect(output).to.match(lineRegEx('Generate:'));
        expect(output).to.match(lineRegEx('bp generate <blueprint> <name>'));
        expect(output).to.match(lineRegEx('bp help generate <blueprint>'));
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
      buildParser().parse('generate', (err, argv, output) => {
        expect(output).to.contain('Missing arguments <blueprint> and <name>');
        done();
      });
    });
    test('demands blueprint <name>', done => {
      buildParser().parse('generate blueprint', (err, argv, output) => {
        expect(output).to.contain('Missing argument blueprint <name>');
        done();
      });
    });
  });
});
