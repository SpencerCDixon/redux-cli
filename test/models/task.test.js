import Task from 'models/task';

describe('(Model) Task', () => {
  const environment = {
    ui: '',
    settings: ''
  };
  const task = new Task(environment);

  describe('#run', () => {
    it('throws if no run() is present', () => {
      expect(() => task.run()).to.throw(/Tasks must implement run()/);
    });
  });
});
