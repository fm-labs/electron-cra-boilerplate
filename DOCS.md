# Internal documentation of how electron-cra-boilerplate is set up.

**! You do not need to run these steps. Internal usage only !**

## Setup ReactJs

Create new `create-react-app` project. We are using the `typescript` template here, because typescript is awesome :)


    $ npx create-react-app --template=typescript electron-cra-boilerplate

## Setup electron

    $ yarn add --dev electron



## Install electron-forge


### a) Use import script

    $ cd electron-cra-boilerplate
    $ yarn add --dev @electorn-forge/cli
    $ yarn electron-forge import

### b) Manually install electron-forge dependencies

    $ yarn add --dev @electron-forge/cli @electron-forge/maker-squirrel @electron-forge/maker-deb @electron-forge/maker-zip


! Note: during the installation of electron-forge, some contents of the package.json will be overwritten (e.g. the 'scripts' block).
But we are going to fix this later !


## Install dependencies

The `concurrently` package enables us to run multiple commands.

    $ yarn add --dev concurrently wait-on
    $ yarn add electron-is-dev


## Setup application for Electron's main process
Now we need the entry point script for electron's main process:

```javascript
// main/electron.js
// @TODO
//...
```

```javascript
// main/preload.js
// @TODO
//...
```

_! After the React app (the renderer app) has been built, the main process scripts are available in the `build/main` directory. !_

Now we have to add/update the `main` script location in your `package.json`.
```json
{
  "main": "main/electron.js"
}
```



## Configuration

### package.json

```json
{
  "main": "main/electron.js",
  "scripts": {
    "dev": "concurrently -k \"BROWSER=none npm start\" \"npm:electron\"",
    "electron": "wait-on tcp:3000 && electron-forge start",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "package": "react-scripts build && electron-forge package",
    "make": "react-scripts build && electron-forge make"
  },
  "homepage": "."
}
```

The important settings here:

* `main`: Point to `main/electron.js`. This is only effective when running in developer mode.  
* `homepage`: Set to `.` to load static assets relative to index.html
* `scripts` 
  * `dev` script: Run webpack dev server and electron app concurrently
  * `electron`: Run electron app (waits for webpack dev server becomes ready)
  * `package`: Create Electron app package via electron-forage
  * `make`: Make distribution package via electron-forage


### forge.config.js

```javascript
module.exports = {
  packagerConfig: {
    dir: "build",
    ignore: [
      // ".idea", ".git", "src", "public",
      // "\.lock$", "\.md$",
      // "forge.config.js",
      // "tsconfig.json"
    ],
    prune: true
  },
  // ....
}
```

## Setup eslint and prettier


    $ yarn add --dev eslint eslint-config-prettier eslint-plugin-prettier prettier

Update `package.json`

```json
{
  "scripts": {
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "plugin:prettier/recommended"
    ]
  }
}

```

```text
// .eslintignore

/.idea/
/.git/
/build/
/public/
/node_modules/
/out/

```

```text
// .prettierrc.json

{
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "arrowParens": "always"
}


```


## Links

* https://www.electronjs.org/docs/latest/
* https://www.electronforge.io/
* https://www.electronforge.io/import-existing-project
* https://electron.github.io/electron-packager/main/index.html
* https://dev.to/mandiwise/electron-apps-made-easy-with-create-react-app-and-electron-forge-560e

Inspired by @mandiwise/cra-electron-forge-demo && 
