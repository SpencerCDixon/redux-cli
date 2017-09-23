import prompt from 'prompt';
import figlet from 'figlet';

import SubCommand from '../models/sub-command';

import initPrompt from '../prompts/initPrompt';
import { setupPrompt } from '../prompts/setup';
import { success } from '../util/text-helper';

class Init extends SubCommand {
    constructor() {
        super();
        setupPrompt('initialization', prompt);
    }

    printUserHelp() {
        this.ui.write(
            'initialization command to create a .reduxrc which has project settings'
        );
    }

    run() {
        this.ui.write(this.cliLogo());
        prompt.get(initPrompt, (err, result) => {
            this.ui.writeInfo('Saving your settings...');
            this.settings.saveDefaults(result);
            this.ui.writeCreate('.reduxrc with configuration saved in project root.');
        });
    }

    cliLogo() {
        return success(
            figlet.textSync('Redux-CLI', {
                font: 'Doom',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        );
    }
}

export default Init;
