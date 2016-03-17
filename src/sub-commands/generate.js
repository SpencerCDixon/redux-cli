import SubCommand from '../models/sub-command';
import Blueprint from '../models/blueprint';
import GenerateFromBluePrint from '../tasks/generate-from-blueprint';
import chalk from 'chalk';

// Primary purpose is to take cli args and pass them through
// to the proper task that will do the generation.
//
// Logic for displaying all blueprints and what their options
// are will live in here.  For now it's pretty baren.
class Generate extends SubCommand {
  constructor() {
    super();
    this.generateTask = new GenerateFromBluePrint(this.environment);
  }

  printUserHelp() {
    const blueprints = Blueprint.list();

    this.ui.writeLine(`Available Blueprints:`);
    this.ui.writeLine('(sources on the top will override sources below)');
    this.ui.writeLine('');

    blueprints.forEach(blueprintSource => {
      this.ui.writeLine(`  ${chalk.blue('Blueprint Source')} ===> ${chalk.green(blueprintSource.source)}:`);

      blueprintSource.blueprints.forEach(blueprint => {
        this.ui.writeLine(`    ${blueprint.name} ${chalk.yellow('<name>')}`);
        this.ui.writeLine(`      ${chalk.gray(blueprint.description)}`);
      });
      this.ui.writeLine('');
    });
  }

  run(blueprintName, cliArgs) {
    if (cliArgs.debug) {
      this.ui.setWriteLevel('DEBUG');
    }

    this.generateTask.run(blueprintName, cliArgs);
  }
}

export default Generate;
