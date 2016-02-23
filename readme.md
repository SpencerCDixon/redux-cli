[![Build Status](https://travis-ci.org/SpencerCDixon/redux-cli.svg?branch=master)](https://travis-ci.org/SpencerCDixon/redux-cli)
[![Code Climate](https://codeclimate.com/github/SpencerCDixon/redux-cli/badges/gpa.svg)](https://codeclimate.com/github/SpencerCDixon/redux-cli)
[![codecov.io](https://codecov.io/github/SpencerCDixon/redux-cli/coverage.svg?branch=master)](https://codecov.io/github/SpencerCDixon/redux-cli?branch=master)

```
______         _                   _____  _     _____  
| ___ \       | |                 /  __ \| |   |_   _| 
| |_/ /___  __| |_   ___  ________| /  \/| |     | |   
|    // _ \/ _` | | | \ \/ /______| |    | |     | |   
| |\ \  __/ (_| | |_| |>  <       | \__/\| |_____| |_  
\_| \_\___|\__,_|\__,_/_/\_\       \____/\_____/\___/  
```

## Quick Start

```javascript
npm i redux-cli -g       // install redux-cli globally 
redux new <project name> // create a new redux project
redux init               // OR configure a current project to use the CLI

// Start generating components/tests and save time \(• ◡ •)/
//(g is alias for generate)
redux g dumb SimpleButton
```

## Table Of Contents

1.  [Getting Started](#getting-started)
2.  [Configuring Existing Project](#config-existing-project)
3.  [Commands](#commands)
4.  [Generators](#generators)
5.  [Roadmap](#roadmap)
6.  [Issues/Contributing](#contributing)

### Getting Started
Running `redux new <project name>` will pull down the amazing [Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit) and
initialize a new git repo.  Running `new` will automatically set up a `.reduxrc`
to work with this specific starter kit.  If you want to integrate the CLI in an
existing project or store your components in different pathes please see [config existing project](#config-existing-project)

### Config Existing Project
There is an `init` subcommand for you to specify all pathes to where components
live in your project.  The `init` command just creates a `.reduxrc` in your
project root.  If you want to you can just create the `.reduxrc` manually.


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
|**fileExtension**|do you use .js or .jsx for your React components| |✓|
|**smartPath**|path where you keep smart/container components|relative from `sourceBase`|✓|
|**dumbPath**|path where you keep your dumb/pure components|realtive from `sourceBase`|✓|
|**formPath**|path where you keep your form components|realtive from `sourceBase`. Assumes you're using redux-form| |
|**duckPath**|path where you keep your Redux Ducks|realtive from `sourceBase`.| |
|**reducerPath**|path where you keep your reducers|realtive from `sourceBase`.| |


### Commands

|Command|Description|Alias|
|---|---|---|
|`redux new <project name>`|creates a new redux project||
|`redux init`|configure an existing redux app to use the CLI||
|`redux generate <generator name> `|generates files and tests for you automatically|`redux g`|


### Generators

**Note**: All component names can be passed as `PascalCase`, `snake_case`, `dash-names`,
or `camelCase` and they will be converted to Pascal Case in the generated files.

|Name|Description|Options|
|---|---|---|
|`redux g dumb <comp name>`|generates a dumb component and test file||
|`redux g smart <smart name>`|generates a smart connected component and test file||
|`redux g form <form name>`|generates a form component (assumes redux-form)||
|`redux g duck <duck name>`|generates a redux duck and test file||

### Roadmap
- [ ] support for view components
- [ ] support for layout components
- [ ] support for fields option in form generator
- [ ] support for routing (generates both view and route and adds to routes)
- [ ] template overriding so people can customize templates

### Contributing
This CLI is very much in the beginning phases and I would love to have people
help me to make it more robust.  Currently, it's pretty opinonated to use the
tooling/templates I prefer in my projects but I'm open to PR's to make it more
universal and support other platforms (I'm on Mac).

#### Development Setup/Contributing
Use `npm link` is to install the CLI locally when testing it and adding
features.

```
nvm use 5.1.0    // install node V5.1 if not present (nvm install 5.1.0)
npm install
npm i eslint babel-eslint -g  // make sure you have eslint installed globally
npm start        // to compile src into lib
npm test         // make sure all tests are passing

// to test the cli in the local directory you can:
npm link         // will install the npm package locally so you can run 'redux <commands>'
redux <run commands here>
```

### Package Utility Scripts:  
```
npm start        // will watch files in src and compile using babel
npm test         // runs test suite with linting.  Throws when lint failing
npm run lint     // lints all files in src and test
```
