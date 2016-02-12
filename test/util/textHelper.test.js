import chalk from 'chalk';
import * as th from 'util/textHelper';

describe('textHelpers', () => {
  describe('#success', () => {
    it('applies green color to text', () => {
      const string = 'Successfully created something important';
      const successString = th.success(string);

      expect(successString).to.eq(chalk.green(string));
      expect(successString).to.not.eq(chalk.red(string));
    });
  });

  describe('#danger', () => {
    it('applies red color to text', () => {
      const string = 'ERROR: something bad happened';
      const errorString = th.danger(string);

      expect(errorString).to.eq(chalk.red(string));
      expect(errorString).to.not.eq(chalk.green(string));
    });
  });

  describe('#warning', () => {
    it('applies yellow color to text', () => {
      const string = 'WARNING: are you sure you want this?';
      const warningString = th.warning(string);

      expect(warningString).to.eq(chalk.yellow(string));
      expect(warningString).to.not.eq(chalk.red(string));
    });
  });

  describe('#info', () => {
    it('applies blue color to text', () => {
      const string = 'INFO: this is some useful information';
      const infoString = th.info(string);

      expect(infoString).to.eq(chalk.blue(string));
      expect(infoString).to.not.eq(chalk.green(string));
    });
  });
});
