import { which } from 'shelljs';
import SubCommand from '../models/subCommand';
import CreateAndStepIntoDirectory from '../tasks/create-and-step-into-directory';

class NewCommand extends SubCommand {
  constructor() {
    super();
  }

  run(cliArgs) {
    this.confirmGit();
    const createDirTask = new CreateAndStepIntoDirectory();
    createDirTask.run({
      dirName: cliArgs.dirName,
      ui: this.ui
    })
    .then(initialDirectory => {
      console.log('Initial directory was: ', initialDirectory);
    });
  }

  confirmGit() {
    if (!which('git')) {
      this.ui.writeError('This script requires you have git installed');
      this.ui.writeInfo('If you have homebrew installed try: brew install git');
      process.exit(1);
    }
  }
}

export default NewCommand;
