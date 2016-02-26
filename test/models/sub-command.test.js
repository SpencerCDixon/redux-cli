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
});
