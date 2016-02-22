import commander from 'commander';
import { error, create } from '../util/textHelper';
import { which, test, mkdir, cd, exec } from 'shelljs';

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
      console.log(error('This script requires you have git installed'));
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
    create('project directory created');
  }

  cdDir() {
    cd(this.dirName);
  }

  initGit() {
    create('setting up tracking with git...');
    console.log();
    exec('git init');
  }

  pullDownKit() {
    exec('git pull https://github.com/davezuko/react-redux-starter-kit.git', function(code) {
      if (code !== 0) {
        error('Something went wrong... please try again');
        process.exit(1);
      }
      create('Completed... project ready to go!');
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
