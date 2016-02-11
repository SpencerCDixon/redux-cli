import chalk from 'chalk';
import * as th from 'util/textHelper';

describe('textHelpers', () => {
  describe('#success', () => {
    it('applies green color text', () => {
      const string = 'Successfully created something important';
      const successString = th.success(string);

      expect(successString).to.eq(chalk.green(string));
      expect(successString).to.not.eq(chalk.red(string));
    });
  });

  describe('#error', () => {
    it('applies red color to text', () => {
      const string = 'ERROR: something bad happened';
      const errorString = th.error(string);

      expect(errorString).to.eq(chalk.red(string));
      expect(errorString).to.not.eq(chalk.green(string));
    });
  });
});
