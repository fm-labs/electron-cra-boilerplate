# Internal documentation of how electron-cra-boilerplate is set up.

**! You do not need to run these steps. Internal usage only !**

## Setup ReactJs

Create new `create-react-app` project. We are using the `typescript` template here, because typescript is awesome :)


    $ npx create-react-app --template=typescript electron-cra-boilerplate
    $ cd electron-cra-boilerplate

## Setup electron

    $ yarn add --dev electron



## Install electron-forge


### a) Use import script

    $ yarn add --dev @electron-forge/cli
    $ yarn electron-forge import

### b) Manually install electron-forge dependencies

    $ yarn add --dev @electron-forge/cli @electron-forge/maker-squirrel @electron-forge/maker-deb @electron-forge/maker-zip


! Note: during the installation of electron-forge, some contents of the package.json will be overwritten (e.g. the 'scripts' block).
But we are going to fix this later !


## Install dependencies

The `concurrently` package enables us to run multiple commands.

    $ yarn add --dev concurrently wait-on
    $ yarn add --dev electron-is-dev


## Setup application for Electron's main process
Now we need the entry point script for electron's main process:

```javascript
// main/electron.js
// -> see source files
```

```javascript
// main/preload.js
// -> see source files
```

_! After the React app (the renderer app) has been built, the main process scripts are available in the `build/main` directory. !_

Now we have to add/update the `main` script location in your `package.json`.
```json
{
  "main": "main/electron.js"
}
```


## Setup react-dev-tools

### a) election-devtools-installer (currently broken)

    $ yarn add --dev electron-devtools-installer

```js
// main/electron.js
// Add to createWindow() function:

// ...
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
  console.log(`Added Extension:  ${name}`);
})
.catch((err) => {
  console.log('An error occurred: ', err);
});
// ...
```


### b) Manually load extension

1. Get the chrome extension contents. The extension Id of react-devtools-extension is `fmkadmapgofadopljbjfkapdkoienihi`.
   1. Find the chrome extension directory on your system (On Ubuntu with chromium Snap the extension directory is located at ~/snap/common/chromium/Default/Extensions/. Non-snap versions often store data in ~/.config/chromium) 
2. Copy extension files to `main/react-devtools-extension/[EXT_VERSION]`

```js

app.whenReady().then(async () => {
  if (isDev) {
    // manually loading react-devtools extension
    const reactDevToolsPath = path.join(__dirname, 'react-devtools-extension/4_25_0_0')
    const ext = await session.defaultSession.loadExtension(reactDevToolsPath, {
      allowFileAccess: true,
    })
  }
})
```



! Due to issues with Chromes Manifest v2 -> v3 migration, we need a react-devtools-extension version `< 4.27`, which has manifest v2 !
At the time of writing only 4.27.1 was avaiable. I used a CRX mirror site to download v4.25.0 (https://www.crx4chrome.com/extensions/fmkadmapgofadopljbjfkapdkoienihi/).


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
