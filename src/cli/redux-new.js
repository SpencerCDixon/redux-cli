import commander from 'commander';
import { error } from '../util/textHelper';
import { which } from 'shelljs';

class AppGenerator {
  constructor(dirName) {
    this.dirName = dirName;
  }

  run() {
    this.confirmGit();
  }

  confirmGit() {
    if (!which('git')) {
      console.log(error('This script requires you have git installed'));
      process.exit(1);
    }
  }
}

commander
  .arguments('<project name>')
  .action(dirName => {
    const generator = new AppGenerator(dirName);
    generator.run();
  })
  .parse(process.argv);
