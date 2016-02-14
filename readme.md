## **DON'T USE**: In active development.  

#### Development Setup
```
nvm use 5.1.0    // install node V5.1 if not present (nvm install 5.1.0)
npm install
npm i eslint babel-eslint -g  // make sure you have eslint installed globally
npm start        // to compile src into lib
npm test         // make sure all tests are passing

// to test the cli in the local directory you can:
npm i . -g       // will install the npm package locally so you can run 'redux <commands>'
redux init       // will prompt you to init a .reduxrc file to be used in the CLI
```

#### Package Utility Scripts:  
```
npm start        // will watch files in src and compile using babel
npm test         // runs test suite with linting.  throws when lints failing
npm run lint     // lints all files in src and test
```

#### Potential CLI API:
`redux init` - sets up project specific file paths for the generators

Useful libraries to look into:  
*  [Prompt](https://github.com/flatiron/prompt) - getting user input
*  [Cliff](https://github.com/flatiron/cliff) - terminal formatting
*  [Chalk](https://github.com/chalk/chalk) - terminal coloring
