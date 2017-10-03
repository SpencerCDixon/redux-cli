import SubCommand from 'models/sub-command';

describe('(Model) SubCommand', () => {
  const command = new SubCommand();

  describe('subclass override intereface', () => {
    test('throws if subclass doesnt have run()', () => {
      expect(() => command.run()).toThrowError(/must implement a run()/);
    });

    test('throws if subclass doesnt have availbleOptions()', () => {
      expect(() => command.availableOptions()).toThrowError(
        /must implement an availableOptions()/
      );
    });
  });

  test('creates an environment which can be passed to tasks', () => {
    const options = {
      ui: 'cli interface',
      settings: 'project settings'
    };
    const command = new SubCommand(options);
    expect(command.environment).toEqual(options);
  });

  describe('cliLogo()', () => {
    test('returns a string', () => {
      const options = {
        ui: 'cli interface',
        settings: 'project settings'
      };
      const command = new SubCommand(options);
      expect(command.cliLogo()).to.be.a('string');
    });
  });
});
