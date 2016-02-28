import { which, rm, exec, pwd } from 'shelljs';
import SubCommand from '../models/sub-command';
import CreateAndStepIntoDirectory from '../tasks/create-and-step-into-directory';
import GitPull from '../tasks/git-pull';

// eventually allow users to create new projects based on a flag
// ie. they can create a new react-redux-starter-kit or a new
// universal react starter kit, etc.

class New extends SubCommand {
  constructor() {
    super();
    this.createDirTask = new CreateAndStepIntoDirectory(this.environment);
    this.gitPullTask = new GitPull(this.environment);
  }

  run(cliArgs) {
    this.confirmGit();
    this.createDirTask.run(cliArgs).then(() => {
      this.gitPullTask.run('git@github.com:davezuko/react-redux-starter-kit.git').then(() => {
        this.resetGitHistory();
        // this.createProjectSettings();
      });
    });
  }

  confirmGit() {
    if (!which('git')) {
      this.ui.writeError('This script requires you have git installed');
      this.ui.writeInfo('If you have homebrew installed try: brew install git');
      process.exit(1);
    }
  }

  printUserHelp() {
    this.ui.write('Command used for generating new redux projects');
  }

  resetGitHistory() {
    // Should maybe prompt user for permission to do this since it's dangerous.
    this.ui.writeInfo('Removing the starter kit .git folder');
    this.ui.writeInfo(pwd());
    // rm('-rf', '.git');
    exec('git init && git add -A && git commit -m"Initial commit"', {silent: true});
    this.ui.writeCreate('Created new .git history for your project');
    this.ui.writeInfo('Congrats! New Redux app ready to go.  CLI generators configured and ready to go');
  }

  // createProjectSettings() {
    // // All settings for react-redux-starter-kit live in this template so when
    // // new projects get created users can immediately start using the CLI
    // const reduxStarterKitTemplate = '../templates/.starterrc';
    // const settings = new ProjectSettings(reduxStarterKitTemplate);
    // settings.save();

    // create('.reduxrc with starter kit settings saved.');
  // }
}

export default New;
