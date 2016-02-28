import chalk from 'chalk';
import MockUI from '../helpers/mock-ui';
import os from 'os';
const EOL = os.EOL;

describe('(Model) UI', () => {
  const ui = new MockUI();

  beforeEach(function() {
    ui.clear();
  });

  describe('#write', () => {
    context('when an error', function() {
      it('writes to errorStream if its an ERROR', () => {
        ui.write('some text', 'ERROR');
        expect(ui.errors).to.eql('some text');
        expect(ui.output).to.eql('');
      });
    });
  });

  describe('#writeCreate', function() {
    it('prepends a green "create"', function() {
      const string = 'file was made here';
      ui.writeCreate(string);
      const expected = chalk.green('  create: ') + chalk.white(string);
      expect(ui.output).to.eq(expected + EOL);
    });
  });
});
