## **DON'T USE**: In active development.  

#### Project Set Up:  
```
nvm use 5.1.0    // install node V5.1 if not present (nvm install 5.1.0)
npm install
npm i eslint -g  // make sure you have eslint installed globally
```

#### Package Scripts:  
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
