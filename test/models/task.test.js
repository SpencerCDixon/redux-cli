import Task from 'models/task';

describe('(Model) Task', () => {
  const environment = {
    ui: '',
    settings: ''
  };
  const task = new Task(environment);

  describe('#run', () => {
    test('throws if no run() is present', () => {
      expect(() => task.run()).toThrowError(/Tasks must implement run()/);
    });
  });
});
