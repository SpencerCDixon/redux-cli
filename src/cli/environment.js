import ProjectSettings from '../models/project-settings';
import UI from '../models/ui';

function makeGetEnvironment() {
  let environment;

  return function() {
    if (!environment) {
      environment = {
        ui: new UI(),
        settings: new ProjectSettings()
      };
    }
    return environment;
  };
}

export default makeGetEnvironment();
