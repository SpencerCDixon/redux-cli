import ProjectSettings from './project-settings';
import UI from './ui';
import figlet from 'figlet';
import { success } from '../util/text-helper';

class SubCommand {
  constructor(options = {}) {
    this.rawOptions = options;
    this.settings = options.settings || new ProjectSettings();
    this.ui = options.ui || new UI();

    this.environment = {
      ui: this.ui,
      settings: this.settings
    };
  }

  run() {
    throw new Error('Subcommands must implement a run()');
  }

  availableOptions() {
    throw new Error('Subcommands must implement an availableOptions()');
  }

  cliLogo() {
    return success(
      figlet.textSync('Blueprint-CLI', {
        font: 'Doom',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    );
  }
}

export default SubCommand;
