import chalk from 'chalk';
import * as th from 'util/text-helper';

describe('(Util) text-helpers', () => {
  describe('#success', () => {
    test('applies green color to text', () => {
      const string = 'Successfully created something important';
      const successString = th.success(string);

      expect(successString).to.eq(chalk.green(string));
      expect(successString).to.not.eq(chalk.red(string));
    });
  });

  describe('#danger', () => {
    test('applies red color to text', () => {
      const string = 'ERROR: something bad happened';
      const errorString = th.danger(string);

      expect(errorString).to.eq(chalk.red(string));
      expect(errorString).to.not.eq(chalk.green(string));
    });
  });

  describe('#warning', () => {
    test('applies yellow color to text', () => {
      const string = 'WARNING: are you sure you want this?';
      const warningString = th.warning(string);

      expect(warningString).to.eq(chalk.yellow(string));
      expect(warningString).to.not.eq(chalk.red(string));
    });
  });

  describe('#normalizeComponentName', () => {
    test('turns snake case into capitalized', () => {
      const string = 'my_component_name';
      const expected = 'MyComponentName';

      expect(th.normalizeComponentName(string)).toEqual(expected);
    });

    test('turns dashes into capitalized', () => {
      const string = 'my-component-name';
      const expected = 'MyComponentName';

      expect(th.normalizeComponentName(string)).toEqual(expected);
    });

    test('turns camelcase into capitalized', () => {
      const string = 'myComponent-name';
      const expected = 'MyComponentName';

      expect(th.normalizeComponentName(string)).toEqual(expected);
    });
  });

  describe('#normalizeDuckName', () => {
    test('camelizes snake case', () => {
      const string = 'my_duck';
      const expected = 'myDuck';

      expect(th.normalizeDuckName(string)).toEqual(expected);
    });

    test('camelizes pascal case', () => {
      const string = 'MyDuck';
      const expected = 'myDuck';

      expect(th.normalizeDuckName(string)).toEqual(expected);
    });

    test('camelizes dashes', () => {
      const string = 'my-duck';
      const expected = 'myDuck';

      expect(th.normalizeDuckName(string)).toEqual(expected);
    });
  });

  describe('#normalizeCasing', () => {
    const string = 'string-to-test';

    test('converts to snake when settings are set to "snake"', () => {
      const expected = 'string_to_test';
      expect(th.normalizeCasing(string, 'snake')).toEqual(expected);
    });

    test('converts to PascalCase when settings are set to "pascal"', () => {
      const expected = 'StringToTest';
      expect(th.normalizeCasing(string, 'pascal')).toEqual(expected);
    });

    test('converts to camelCase when settings are set to "camel"', () => {
      const expected = 'stringToTest';
      expect(th.normalizeCasing(string, 'camel')).toEqual(expected);
    });

    test('converts to dashes-case when settings are set to "dashes"', () => {
      const expected = 'string-to-test';
      expect(th.normalizeCasing(string, 'dashes')).toEqual(expected);
    });

    test('leaves string alone when set to "default"', () => {
      expect(th.normalizeCasing(string, 'default')).toEqual(string);
    });

    test('throws error if not one of the allowed conversions', () => {
      expect(() => th.normalizeCasing(string)).toThrowError(
        /Casing must be one of: default, snake, pascal, camel/
      );
    });
  });
});
