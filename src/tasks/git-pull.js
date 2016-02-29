import Task from '../models/task';
import denodeify from 'denodeify';

const exec = denodeify(require('child_process').exec);

export default class extends Task {
  constructor(environment) {
    super(environment);
  }

  run(gitUrl) {
    const ui = this.ui;
    ui.startProgress(`Fetching ${gitUrl} from github.`);

    return exec(`git pull ${gitUrl}`, {silent: true}).then((err, stdout, stderr) => {
      ui.stopProgress();

      if (err) {
        ui.writeError('Something went wrong... please try again.  Make sure you have internet access');
        ui.writeError(`Error code: ${err}`);
        ui.writeError(stdout);
        ui.writeError(stderr);
        process.exit(1);
      }
      ui.writeInfo('pulled down repo');
      Promise.resolve();
    });
  }
}
