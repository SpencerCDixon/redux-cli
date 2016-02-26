import Task from 'models/task';

describe('(Model) Task', () => {
  const task = new Task();

  describe('#run', () => {
    it('throws if no run() is present', () => {
      expect(() => task.run()).to.throw(/Tasks must implement run()/);
    });
  });
});
