import chalk from 'chalk';
import MockUI from '../helpers/mock-ui';
import { EOL } from 'os';

describe('(Model) UI', () => {
  const ui = new MockUI('DEBUG');

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

  describe('#writeLine', function() {
    it('appends EOL to text being written', function() {
      ui.writeLine('this is a line');
      const expectedString = 'this is a line' + EOL;
      expect(ui.output).to.eql(expectedString);
    });
  });

  context('helper writes', function() {
    const string = 'file was made here';

    describe('#writeCreate', function() {
      it('prepends a green "create"', function() {
        ui.writeCreate(string);
        const expected = chalk.green('  create: ') + chalk.white(string);
        expect(ui.output).to.eq(expected + EOL);
      });
    });
    describe('#writeInfo', function() {
      it('prepends a blue "info"', function() {
        ui.writeInfo(string);
        const expected = chalk.blue('  info: ') + chalk.white(string);
        expect(ui.output).to.eq(expected + EOL);
      });
    });
    describe('#writeDebug', function() {
      it('prepends a gray "debug"', function() {
        ui.writeDebug(string);
        const expected = chalk.gray('  debug: ') + chalk.white(string);
        expect(ui.output).to.eq(expected + EOL);
      });
    });
    describe('#writeError', function() {
      it('prepends a red "error"', function() {
        ui.writeError(string);
        const expected = chalk.red('  error: ') + chalk.white(string);
        expect(ui.errors).to.eq(expected + EOL);
      });
    });
    describe('#writeWarning', function() {
      it('prepends a yellow "warning"', function() {
        ui.writeWarning(string);
        const expected = chalk.yellow('  warning: ') + chalk.white(string);
        expect(ui.output).to.eq(expected + EOL);
      });
    });
    describe('#writeCreate', function() {
      it('prepends a yellow "warning"', function() {
        ui.writeCreate(string);
        const expected = chalk.green('  create: ') + chalk.white(string);
        expect(ui.output).to.eq(expected + EOL);
      });
    });
    describe('#writeWouldCreate', function() {
      it('prepends a green "warning"', function() {
        ui.writeWouldCreate(string);
        const expected = chalk.green('  would create: ') + chalk.white(string);
        expect(ui.output).to.eq(expected + EOL);
      });
    });
  });

  describe('#writeLevelVisible', function() {
    context('when set to ERROR', function() {
      it('can only see ERROR messages', function() {
        const ui = new MockUI('ERROR');
        expect(ui.writeLevelVisible('ERROR')).to.be.true;
        expect(ui.writeLevelVisible('WARNING')).to.be.false;
        expect(ui.writeLevelVisible('INFO')).to.be.false;
        expect(ui.writeLevelVisible('DEBUG')).to.be.false;
      });
    });

    context('when set to WARNING', function() {
      it('can only see ERROR & WARNING messages', function() {
        const ui = new MockUI('WARNING');
        expect(ui.writeLevelVisible('ERROR')).to.be.true;
        expect(ui.writeLevelVisible('WARNING')).to.be.true;
        expect(ui.writeLevelVisible('INFO')).to.be.false;
        expect(ui.writeLevelVisible('DEBUG')).to.be.false;
      });
    });

    context('when set to INFO', function() {
      it('can only see ERROR/WARNING/INFO messages', function() {
        const ui = new MockUI('INFO');
        expect(ui.writeLevelVisible('ERROR')).to.be.true;
        expect(ui.writeLevelVisible('WARNING')).to.be.true;
        expect(ui.writeLevelVisible('INFO')).to.be.true;
        expect(ui.writeLevelVisible('DEBUG')).to.be.false;
      });
    });

    context('when set to DEBUG', function() {
      it('has complete visibility', function() {
        const ui = new MockUI('DEBUG');
        expect(ui.writeLevelVisible('DEBUG')).to.be.true;
        expect(ui.writeLevelVisible('INFO')).to.be.true;
        expect(ui.writeLevelVisible('WARNING')).to.be.true;
        expect(ui.writeLevelVisible('ERROR')).to.be.true;
      });
    });
  });

  describe('#setWriteLevel', function() {
    it('can reset writeLevel', function() {
      expect(ui.writeLevel).to.eql('DEBUG');
      ui.setWriteLevel('ERROR');
      expect(ui.writeLevel).to.eql('ERROR');
    });

    it('throws when a bad writeLevel is passed in', function() {
      expect(() => ui.setWriteLevel('bogus')).to.throw(
        /Valid values are: DEBUG, INFO, WARNING, ERROR/
      );
    });
  });

  context('async progress bar', function() {
    describe('#startProgress', function() {
      it('starts streaming', function() {
        expect(ui.streaming).to.be.false;
        ui.startProgress('some async call');
        expect(ui.streaming).to.be.true;
      });

      it('calls stream every 100 ms', function() {
        const clock = sinon.useFakeTimers();
        const spy = sinon.spy();
        ui.startProgress('some async call', spy);
        clock.tick(101);
        expect(spy.calledOnce).to.be.true;
        clock.restore();
      });
    });

    describe('#stopProgress', function() {
      it('clears interval when it exists', function() {
        ui.startProgress('some async call');
        expect(ui.streaming).to.be.true;
        ui.stopProgress();
        expect(ui.streaming).to.be.false;
      });
    });
  });
});
