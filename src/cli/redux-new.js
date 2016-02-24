import commander from 'commander';
import { which, test, mkdir, cd, exec, rm } from 'shelljs';
import logUpdate from 'log-update';
import elegantSpinner from 'elegant-spinner';
import chalk from 'chalk';

import { info, error, create } from '../util/textHelper';
import ProjectSettings from '../projectSettings';

const frame = elegantSpinner();

class AppGenerator {
  constructor(dirName) {
    this.dirName = dirName;
  }

  run() {
    this.confirmGit();
    this.confirmDir();
    this.createDirectory();
    this.cdDir();
    this.initGit();
    this.pullDownKit();
  }

  confirmGit() {
    if (!which('git')) {
      error('This script requires you have git installed');
      process.exit(1);
    }
  }

  confirmDir() {
    if (test('-d', this.dirName)) {
      error(`${this.dirName} directory already exists!  Please choose another name`);
      process.exit(1);
    }
  }

  createDirectory() {
    mkdir('-p', this.dirName);
    create('Project directory created');
  }

  cdDir() {
    cd(this.dirName);
  }

  initGit() {
    create('Setting up tracking with git...');
    exec('git init', {silent: true}, (code, stdout, stderr) => {
      if (stdout) info(stdout);
      if (stderr) error(stderr);
    });
  }

  resetGitHistory() {
    // Should maybe prompt user for permission to do this since it's dangerous.
    info('Removing the starter kit .git folder');
    rm('-rf', '.git');
    exec('git init && git add -A && git commit -m"Initial commit"', {silent: true});
    create('Created new .git history for your project');
    info('Congrats! New Redux app ready to go.  CLI generators configured and ready to go');
  }

  createProjectSettings() {
    // All settings for react-redux-starter-kit live in this template so when
    // new projects get created users can immediately start using the CLI
    const reduxStarterKitTemplate = '../templates/.starterrc';
    const settings = new ProjectSettings(reduxStarterKitTemplate);
    settings.save();

    create('.reduxrc with starter kit settings saved.');
  }

  pullDownKit() {
    const content = info('Fetching the Redux Starter Kit...  ', false);

    let interval = setInterval(() => {
      logUpdate(`${content}${chalk.cyan.bold.dim(frame())}`);
    }, 100);

    exec('git pull git@github.com:davezuko/react-redux-starter-kit.git', {silent: true}, (code, stdout, stderr) => {
      clearInterval(interval);

      if (code !== 0) {
        error('Something went wrong... please try again.  Make sure you have internet access');
        error(`Error code: ${code}`);
        error(stdout);
        error(stderr);
        process.exit(1);
      }

      this.createProjectSettings();
      this.resetGitHistory();
    });
  }
}

commander
  .arguments('<project name>')
  .action(dirName => {
    const generator = new AppGenerator(dirName);
    generator.run();
  })
  .parse(process.argv);
