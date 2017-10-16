import prompt from 'prompt';
import SubCommand from '../models/sub-command';
import initPrompt from '../prompts/initPrompt';
import { setupPrompt } from '../prompts/setup';

class Init extends SubCommand {
  constructor(options) {
    super(options);
    setupPrompt('initialization', prompt);
  }

  printUserHelp() {
    this.ui.write(
      'initialization command to create a .blueprintrc which has project settings'
    );
  }

  run() {
    this.ui.write(this.cliLogo());
    prompt.get(initPrompt, (err, result) => {
      this.ui.writeInfo('Saving your settings...');
      this.settings.saveDefaults(result);
      this.ui.writeCreate(
        '.blueprintrc with configuration saved in project root.'
      );
    });
  }
}

export default Init;
