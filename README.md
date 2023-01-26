# Getting Started with electron-cra-boilerplate

This project was bootstrapped with [electron-cra-boilerplate](https://github.com/fm-labs/electron-cra-boilerplate).

Using [Create React App](https://github.com/facebook/create-react-app) (Typescript) + Electron + Electron Forge

## Quickstart

### Installation
    $ git clone https://github.com/fm-labs/electron-cra-boilerplate.git my-electron-app
    $ cd my-electron-app
    $ yarn install

! You can also use `npm` instead of `yarn` !

### Run in developer mode

Runs the Electron app and the Webpack development server for the React app.
Changes in the React app source code, should be automatically updated in the Electron app.

    $ yarn run dev

### Create Electron package

Creates an Electron app package. Output is stored in `out/`.

    $ yarn run package

    // change to the output directory
    // depending on your operating system, cpu architecture or electron-forge configuration
    // the path might be different.
    $ cd ./out/electron-cra-boilerplate-linux-x64
    // run the packaged app
    $ ./electron-cra-boilerplate



## Available Scripts

In the project directory, you can run:

### `yarn run dev`

Runs the Electron app and the React app in development mode.
The electron app will open automatically with browser-devtools and react-devtools attached.

This command starts the webpack dev server and the electron app concurrently.

### `yarn run electron`
Runs the Electron app in development mode.
The electron app will open automatically with browser-devtools and react-devtools attached.

### `yarn run package`
Creates an Electron app package.
By default the packaged app is saved in the `out/` directory.


### `yarn run make`
Takes a packaged Electron application and outputs a certain kind of distributable


### `yarn run lint`
Runs eslint and print errors/warnings to console


### `yarn run lint:fix`
Runs eslint and fix errors/warnings in source code files.




### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


### `yarn test:nowatch`

Launches the testrunner and exits after tests have been completed.


### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Troubleshooting

### Error: yarn not found

    $ npm i -g yarn



### Error: Cannot make for rpm during `yarn run make`

Solution for Ubuntu/Debian users: Install rpm package

    $ sudo apt install rpm


## Useful links:

* [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
* [React documentation](https://reactjs.org/)
* [Electron Documentation](https://www.electronjs.org/docs/latest/)
* [Electron Forge Documentation](https://electronforge.io/)
* [Electron Packager Documentation](https://github.com/electron/electron-packager)



## TODO
- [ ] Remove src from final Electron package
- [x] Disable source maps generation for production builds of react app
- [ ] App icon
- [ ] React Dev Tools
- [ ] ASAR support
- [x] ESLint
- [x] Prettier
- [x] GitHub Actions Workflow for
  - [x] testing
  - [x] building
  - [x] packaging
  - [x] making
- [x] npm/yarn scripts to make specific electron-forge maker targets 
- [ ] Travis support
- [ ] Badges

