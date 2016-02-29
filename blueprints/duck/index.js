module.exports = {
  fileMapTokens() {
    return {
      __duck__: (options) => {
        return 'redux/modules';
      }
    };
  }
};
