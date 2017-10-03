import chalk from 'chalk';
import MockUI from '../helpers/mock-ui';
import { EOL } from 'os';

describe('(Model) UI', () => {
  const ui = new MockUI('DEBUG');

  beforeEach(() => {
    ui.clear();
  });

  describe('#write', () => {
    describe('when an error', () => {
      test('writes to errorStream if its an ERROR', () => {
        ui.write('some text', 'ERROR');
        expect(ui.errors).toEqual('some text');
        expect(ui.output).toEqual('');
      });
    });
  });

  describe('#writeLine', () => {
    test('appends EOL to text being written', () => {
      ui.writeLine('this is a line');
      const expectedString = 'this is a line' + EOL;
      expect(ui.output).toEqual(expectedString);
    });
  });

  describe('helper writes', () => {
    const string = 'file was made here';

    describe('#writeCreate', () => {
      test('prepends a green "create"', () => {
        ui.writeCreate(string);
        const expected = chalk.green('  create: ') + chalk.white(string);
        expect(ui.output).to.eq(expected + EOL);
      });
    });
    describe('#writeInfo', () => {
      test('prepends a blue "info"', () => {
        ui.writeInfo(string);
        const expected = chalk.blue('  info: ') + chalk.white(string);
        expect(ui.output).to.eq(expected + EOL);
      });
    });
    describe('#writeDebug', () => {
      test('prepends a gray "debug"', () => {
        ui.writeDebug(string);
        const expected = chalk.gray('  debug: ') + chalk.white(string);
        expect(ui.output).to.eq(expected + EOL);
      });
    });
    describe('#writeError', () => {
      test('prepends a red "error"', () => {
        ui.writeError(string);
        const expected = chalk.red('  error: ') + chalk.white(string);
        expect(ui.errors).to.eq(expected + EOL);
      });
    });
    describe('#writeWarning', () => {
      test('prepends a yellow "warning"', () => {
        ui.writeWarning(string);
        const expected = chalk.yellow('  warning: ') + chalk.white(string);
        expect(ui.output).to.eq(expected + EOL);
      });
    });
    describe('#writeCreate', () => {
      test('prepends a yellow "warning"', () => {
        ui.writeCreate(string);
        const expected = chalk.green('  create: ') + chalk.white(string);
        expect(ui.output).to.eq(expected + EOL);
      });
    });
    describe('#writeWouldCreate', () => {
      test('prepends a green "warning"', () => {
        ui.writeWouldCreate(string);
        const expected = chalk.green('  would create: ') + chalk.white(string);
        expect(ui.output).to.eq(expected + EOL);
      });
    });
  });

  describe('#writeLevelVisible', () => {
    describe('when set to ERROR', () => {
      test('can only see ERROR messages', () => {
        const ui = new MockUI('ERROR');
        expect(ui.writeLevelVisible('ERROR')).toBe(true);
        expect(ui.writeLevelVisible('WARNING')).toBe(false);
        expect(ui.writeLevelVisible('INFO')).toBe(false);
        expect(ui.writeLevelVisible('DEBUG')).toBe(false);
      });
    });

    describe('when set to WARNING', () => {
      test('can only see ERROR & WARNING messages', () => {
        const ui = new MockUI('WARNING');
        expect(ui.writeLevelVisible('ERROR')).toBe(true);
        expect(ui.writeLevelVisible('WARNING')).toBe(true);
        expect(ui.writeLevelVisible('INFO')).toBe(false);
        expect(ui.writeLevelVisible('DEBUG')).toBe(false);
      });
    });

    describe('when set to INFO', () => {
      test('can only see ERROR/WARNING/INFO messages', () => {
        const ui = new MockUI('INFO');
        expect(ui.writeLevelVisible('ERROR')).toBe(true);
        expect(ui.writeLevelVisible('WARNING')).toBe(true);
        expect(ui.writeLevelVisible('INFO')).toBe(true);
        expect(ui.writeLevelVisible('DEBUG')).toBe(false);
      });
    });

    describe('when set to DEBUG', () => {
      test('has complete visibility', () => {
        const ui = new MockUI('DEBUG');
        expect(ui.writeLevelVisible('DEBUG')).toBe(true);
        expect(ui.writeLevelVisible('INFO')).toBe(true);
        expect(ui.writeLevelVisible('WARNING')).toBe(true);
        expect(ui.writeLevelVisible('ERROR')).toBe(true);
      });
    });
  });

  describe('#setWriteLevel', () => {
    test('can reset writeLevel', () => {
      expect(ui.writeLevel).toEqual('DEBUG');
      ui.setWriteLevel('ERROR');
      expect(ui.writeLevel).toEqual('ERROR');
    });

    test('throws when a bad writeLevel is passed in', () => {
      expect(() => ui.setWriteLevel('bogus')).toThrowError(
        /Valid values are: DEBUG, INFO, WARNING, ERROR/
      );
    });
  });

  describe('async progress bar', () => {
    describe('#startProgress', () => {
      test('starts streaming', () => {
        expect(ui.streaming).toBe(false);
        ui.startProgress('some async call');
        expect(ui.streaming).toBe(true);
      });

      test('calls stream every 100 ms', () => {
        const clock = sinon.useFakeTimers();
        const spy = sinon.spy();
        ui.startProgress('some async call', spy);
        clock.tick(101);
        expect(spy.calledOnce).toBe(true);
        clock.restore();
      });
    });

    describe('#stopProgress', () => {
      test('clears interval when it exists', () => {
        ui.startProgress('some async call');
        expect(ui.streaming).toBe(true);
        ui.stopProgress();
        expect(ui.streaming).toBe(false);
      });
    });
  });
});
