import chalk, { hasColor } from 'chalk';
import * as th from '../../src/util/textHelper';

describe('textHelpers', () => {
  describe('#success', () => {
    it('applies green color text', () => {
      const successString = th.success(
        'Successfully created something important'
      );
      expect(hasColor(successString)).to.be.true;
    });
  });

  describe('#error', () => {
    it('applies red color to text', () => {
      const errorString = th.error(
        'ERROR: something bad happened'
      );
      expect(hasColor(errorString)).to.be.true;
    });
  });
});
