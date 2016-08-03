import Task from '../models/task';
import Blueprint from '../models/blueprint';

export default class extends Task {
  constructor(environment) {
    super(environment);
  }

  // confirm blueprint exists
  // go fetch blueprint object
  // noramlize/setup args to be passed to install
  // install the blueprint
  run(blueprintName, cliArgs) {
    // if blueprint doesnt exist
      // this.ui.writeError(
        // 'this is not a valid blueprint. type help for help.. or w/e'
      // );
      // process.exit(1);
    // }

    const mainBlueprint = this.lookupBlueprint(blueprintName);

    const entity = {
      name: cliArgs.entity.name,
      options: cliArgs.entity.options
    };

    const blueprintOptions = {
      originalBlueprintName: blueprintName,
      ui: this.ui,
      settings: this.settings,
      dryRun: cliArgs.dryRun,
      entity
    };

    mainBlueprint.install(blueprintOptions);
  }

  lookupBlueprint(name) {
    return Blueprint.lookup(name);
  }
}
