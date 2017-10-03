module.exports = {
  description() {
    return 'Generates a blueprint with desired hooks';
  },

  command: {
    aliases: ['bp'],
    options: {
      description: {
        alias: 'D',
        describe: 'override default description',
        type: 'string'
      },
      command: {
        alias: 'c',
        describe: 'add hook to specify generate command options',
        type: 'boolean'
      },
      aliases: {
        alias: 'A',
        describe: 'specify aliases for the blueprint',
        type: 'array',
        default: []
      },
      locals: {
        alias: 'l',
        describe: 'add hook to specify locals',
        type: 'boolean'
      },
      'file-map-tokens': {
        alias: 'm',
        describe: 'add hook for fileMapTokens',
        type: 'boolean'
      },
      'before-install': {
        alias: 'b',
        describe: 'add hook for beforeInstall',
        type: 'boolean'
      },
      'after-install': {
        alias: 'a',
        describe: 'add hook for afterInstall',
        type: 'boolean'
      },
      'all-hooks': {
        alias: 'H',
        describe: 'shortcut to add all hooks, equivalent to -clmba',
        type: 'boolean'
      }
    },
    examples: [
      '$0 generate blueprint files_only',
      '$0 generate blueprint complex_bp --aliases cpx --all-hooks'
    ],
    epilogue:
      'Documentation: https://github.com/SpencerCDixon/redux-cli#creating-blueprints',
    sanitize: argv => {
      // aliases imply command
      if (argv.aliases.length) {
        argv.command = true;
      }
      // aliases to be rendered as a string
      argv.aliases = JSON.stringify(argv.aliases);

      // NB: if command was specified but aliases is an empty array it will
      // still be rendered. This is harmless and serves as a reminder
      // to the blueprint author of the supported feature and syntax

      // allHooks?
      if (argv.allHooks) {
        argv.command = true;
        argv.locals = true;
        argv.fileMapTokens = true;
        argv.beforeInstall = true;
        argv.afterInstall = true;
      }

      return argv;
    }
  },

  locals({ entity: { options } }) {
    return options;
  }
};
