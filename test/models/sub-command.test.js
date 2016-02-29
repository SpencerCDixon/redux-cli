import SubCommand from 'models/sub-command';

describe('(Model) SubCommand', () => {
  const command = new SubCommand();

  describe('subclass override intereface', () => {
    it('throws if subclass doesnt have run()', () => {
      expect(() => command.run()).to.throw(/must implement a run()/);
    });

    it('throws if subclass doesnt have availbleOptions()', () => {
      expect(() => command.availableOptions()).to.throw(
        /must implement an availableOptions()/
      );
    });
  });

  it('creates an environment which can be passed to tasks', function() {
    const options = {
      ui: 'cli interface',
      settings: 'project settings'
    };
    const command = new SubCommand(options);
    expect(command.environment).to.eql(options);
  });
});
