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
    const string = '.reduxrc was created';

    it('applies blue color to text', () => {
      const arg = chalk.blue('    info: ') + chalk.white(string);
      const spy = sinon.spy(console, 'log');
      th.info(string);

      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith(arg)).to.be.true;
      spy.restore();
    });

    it('returns text when passing false to logging option', () => {
      const infoString = th.info(string, false);
      const expected = chalk.blue('    info: ') + chalk.white(string);
      expect(infoString).to.eql(expected);
    });
  });

  describe('#create', () => {
    const string = '.reduxrc was created';

    it('prepends "create" to text', () => {
      const arg = chalk.green('    create: ') + chalk.white(string);
      const spy = sinon.spy(console, 'log');
      th.create(string);

      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith(arg)).to.be.true;
      spy.restore();
    });

    it('returns text when passing false to logging option', () => {
      const createString = th.create(string, false);
      const expected = chalk.green('    create: ') + chalk.white(string);
      expect(createString).to.eql(expected);
    });
  });

  describe('#error', () => {
    const string = 'something went wrong';

    it('prepends "error" to text', () => {
      const arg = chalk.red('    error: ') + chalk.white(string);
      const spy = sinon.spy(console, 'log');
      th.error(string);

      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith(arg)).to.be.true;
      spy.restore();
    });

    it('returns text when passing false to logging option', () => {
      const errorString = th.error(string, false);
      const expected = chalk.red('    error: ') + chalk.white(string);
      expect(errorString).to.eql(expected);
    });
  });

  describe('#normalizeComponentName', () => {
    it('turns snake case into capitalized', () => {
      const string = 'my_component_name';
      const expected = 'MyComponentName';

      expect(th.normalizeComponentName(string)).to.eql(expected);
    });

    it('turns dashes into capitalized', () => {
      const string = 'my-component-name';
      const expected = 'MyComponentName';

      expect(th.normalizeComponentName(string)).to.eql(expected);
    });

    it('turns camelcase into capitalized', () => {
      const string = 'myComponent-name';
      const expected = 'MyComponentName';

      expect(th.normalizeComponentName(string)).to.eql(expected);
    });
  });

  describe('#normalizeDuckName', () => {
    it('camelizes snake case', () => {
      const string = 'my_duck';
      const expected = 'myDuck';

      expect(th.normalizeDuckName(string)).to.eql(expected);
    });

    it('camelizes pascal case', () => {
      const string = 'MyDuck';
      const expected = 'myDuck';

      expect(th.normalizeDuckName(string)).to.eql(expected);
    });

    it('camelizes dashes', () => {
      const string = 'my-duck';
      const expected = 'myDuck';

      expect(th.normalizeDuckName(string)).to.eql(expected);
    });
  });
});
