class MockSettings {
  constructor(args) {
    const defaults = {
      sourceBase: './tmp/src',
      testBase: './tmp/test',
      fileCasing: 'default',
      fileExtension: 'js',
      wrapFilesInFolders: false
    };
    this.settings = Object.assign({}, defaults, args);
  }

  getSetting(key) {
    return this.settings[key];
  }
}
export default MockSettings;
