import { exec } from 'shelljs';
import Task from '../models/task';

export default class extends Task {
  constructor(environment) {
    super(environment);
  }

  run(gitUrl) {
    const ui = this.ui;
    ui.startProgress(`Fetching ${gitUrl} from github.`);

    exec(`git pull ${gitUrl}`, {silent: true}, (code, stdout, stderr) => {
      this.ui.stopProgress();

      if (code !== 0) {
        ui.writeError('Something went wrong... please try again.  Make sure you have internet access');
        ui.writeError(`Error code: ${code}`);
        ui.writeError(stdout);
        ui.writeError(stderr);
        process.exit(1);
      }
    });
  }
}
