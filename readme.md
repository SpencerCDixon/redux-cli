[![Build Status](https://travis-ci.org/SpencerCDixon/redux-cli.svg?branch=master)](https://travis-ci.org/SpencerCDixon/redux-cli)
[![Code Climate](https://codeclimate.com/github/SpencerCDixon/redux-cli/badges/gpa.svg)](https://codeclimate.com/github/SpencerCDixon/redux-cli)
[![codecov.io](https://codecov.io/github/SpencerCDixon/redux-cli/coverage.svg?branch=master)](https://codecov.io/github/SpencerCDixon/redux-cli?branch=master)

______         _                   _____  _     _____  
| ___ \       | |                 /  __ \| |   |_   _| 
| |_/ /___  __| |_   ___  ________| /  \/| |     | |   
|    // _ \/ _` | | | \ \/ /______| |    | |     | |   
| |\ \  __/ (_| | |_| |>  <       | \__/\| |_____| |_  
\_| \_\___|\__,_|\__,_/_/\_\       \____/\_____/\___/  


**Getting Project Setup**:
There is an `init` subcommand for you to specify all pathes to where components
live in your project.  The `init` command just creates a `.reduxrc` in your
project root.  If you want to you can just create the `.reduxrc` manually.

```javascript
npm i redux-cli -g  // install redux-cli globally so you can use cli without prepending node_modules
redux init          // Then follow along with questions to create .reduxrc file 

// Start generating components/tests and save time \(• ◡ •)/
```

Final `.reduxrc` might look like this:

```javascript
{
  "sourceBase":"src",
  "testPath":"./test",
  "smartPath":"containers",
  "dumbPath":"components",
  "formPath":"components/forms",
  "fileExtension":"js",
  "duckPath":"redux/modules",
  "reducerPath":""
}
```  

### Initial Configuration
|Key Name|Description|Extra Info|Required|
|---|---|---|---|
|**sourceBase**|where you keep your pre-compiled source|usually going to be `./src`|✓|
|**testPath**|where you keep your tests|usually going to be `./test` or `./tests`  |✓|
|**fileExtension**|do you use .js or .jsx for your React components|   |  |
|**smartPath**|path where you keep smart/container components|relative from `sourceBase`|✓|
|**dumbPath**|path where you keep your dumb/pure components|realtive from `sourceBase`|✓|
|**formPath**|path where you keep your form components|realtive from `sourceBase`. Assumes you're using redux-form| |
|**duckPath**|path where you keep your Redux Ducks|realtive from `sourceBase`.| |
|**reducerPath**|path where you keep your reducers|realtive from `sourceBase`.| |


### Commands

`redux dumb <ComponentName>` - generates a dumb component and test file  
`redux smart <ComponentName>` - generates a smart component and test file  
`redux form <ComponentName>` - generates a form component and test file  

All component names can be passed as `PascalCase`, `snake_case`, `dash-names`,
or `camelCase` and they will be converted to Pascal Case in the generated files.

`redux duck <duckName>` - generates redux duck and test file testing reducer  

Duck names will be converted to camelCase automatically.


### Development Setup
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

### Package Utility Scripts:  
```
npm start        // will watch files in src and compile using babel
npm test         // runs test suite with linting.  throws when lints failing
npm run lint     // lints all files in src and test
```

Useful libraries to look into:  
*  [Prompt](https://github.com/flatiron/prompt) - getting user input
*  [Cliff](https://github.com/flatiron/cliff) - terminal formatting
*  [Chalk](https://github.com/chalk/chalk) - terminal coloring
