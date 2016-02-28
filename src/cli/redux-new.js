import commander from 'commander';
// import { which, test, mkdir, cd, exec, rm } from 'shelljs';
// import logUpdate from 'log-update';
// import elegantSpinner from 'elegant-spinner';
// import chalk from 'chalk';

// import { info, error, create } from '../util/textHelper';
// import ProjectSettings from '../projectSettings';
import New from '../sub-commands/new';

// const frame = elegantSpinner();

// class AppGenerator {
  // constructor(dirName) {
    // this.dirName = dirName;
  // }

  // run() {
    // this.confirmGit();
    // this.confirmDir();
    // this.createDirectory();
    // this.cdDir();
    // this.initGit();
    // this.pullDownKit();
  // }

  // confirmGit() {
    // if (!which('git')) {
      // error('This script requires you have git installed');
      // process.exit(1);
    // }
  // }

  // confirmDir() {
    // if (test('-d', this.dirName)) {
      // error(`${this.dirName} directory already exists!  Please choose another name`);
      // process.exit(1);
    // }
  // }

  // createDirectory() {
    // mkdir('-p', this.dirName);
    // create('Project directory created');
  // }

  // cdDir() {
    // cd(this.dirName);
  // }

  // initGit() {
    // create('Setting up tracking with git...');
    // exec('git init', {silent: true});
  // }


  // pullDownKit() {
    // const content = info('Fetching the Redux Starter Kit...  ', false);

    // let interval = setInterval(() => {
      // logUpdate(`${content}${chalk.cyan.bold.dim(frame())}`);
    // }, 100);

    // exec('git pull git@github.com:davezuko/react-redux-starter-kit.git', {silent: true}, (code, stdout, stderr) => {
      // clearInterval(interval);

      // if (code !== 0) {
        // error('Something went wrong... please try again.  Make sure you have internet access');
        // error(`Error code: ${code}`);
        // error(stdout);
        // error(stderr);
        // process.exit(1);
      // }

      // this.createProjectSettings();
      // this.resetGitHistory();
    // });
  // }
// }

const command = new New();

commander.on('--help', () => {
  command.printUserHelp();
});

commander
  .arguments('<project name>')
  .action(dirName => {
    command.run({
      dirName: dirName
    });
  })
  .parse(process.argv);
