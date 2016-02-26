import ProjectSettings from './project-settings';
import UI from './ui';

class SubCommand {
  constructor(options = {}) {
    this.rawOptions = options;
    this.settings = options.settings || new ProjectSettings();
    this.ui = options.ui || new UI();
  }

  run() {
    throw new Error('Subcommands must implement a run()');
  }

  availableOptions() {
    throw new Error('Subcommands must implement an availableOptions()');
  }
}

export default SubCommand;
