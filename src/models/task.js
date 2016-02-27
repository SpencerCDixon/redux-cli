class Task {
  constructor(environment) {
    this.ui = environment.ui;
    this.settings = environment.settings;
  }

  run() {
    throw new Error('Tasks must implement run()');
  }
}

export default Task;
