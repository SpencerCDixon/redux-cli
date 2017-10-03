module.exports = {
  description() {
    return 'Generates a smart (aka container) component';
  },
  fileMapTokens() {
    return {
      __smart__: options => {
        return options.settings.getSetting('smartPath');
      }
    };
  }
};
