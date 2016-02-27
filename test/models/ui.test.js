import MockUI from '../helpers/mock-ui';

describe('(Model) UI', () => {
  const ui = new MockUI();

  describe('#write', () => {
    context('when an error', function() {
      it('writes to errorStream if its an ERROR', () => {
        ui.write('some text', 'ERROR');
        expect(ui.errors).to.eql('some text');
        expect(ui.output).to.eql('');
      });
    });

    context('when no error', function() {
      it('writes to outputStream', () => {

      });
    });
  });
});
