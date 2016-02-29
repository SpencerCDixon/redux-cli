import SubCommand from '../models/sub-command';
import GenerateFromBluePrint from '../tasks/generate-from-blueprint';

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
    this.ui.write('generates code from blueprints');
  }

  run(blueprintName, cliArgs) {
    this.generateTask.run(blueprintName, cliArgs);
  }
}

export default Generate;
