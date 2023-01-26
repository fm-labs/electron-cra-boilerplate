const { app, session, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

// @todo electron-devtools-install not working
// // Conditionally include the dev tools installer to load React Dev Tools
// let installExtension, REACT_DEVELOPER_TOOLS
// if (isDev) {
//   const devTools = require('electron-devtools-installer')
//   installExtension = devTools.default
//   REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS
// }

const createWindow = () => {
  // Create the browser window.
  const preloadScriptPath = `file://${path.join(__dirname, '/preload.js')}`
  console.log('PRELOAD SCRIPT PATH', preloadScriptPath)
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      preload: preloadScriptPath,
    },
  })

  // and load the index.html of the app.
  const mainWindowUrl = `file://${path.join(__dirname, '../build/index.html')}`
  console.log('MAIN WINDOW URL', mainWindowUrl)
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : mainWindowUrl)

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  if (isDev) {
    // Open the DevTools in detached mode
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()

  if (isDev) {
  }
})

app.whenReady().then(async () => {
  if (isDev) {
    // @todo Install react-devtools
    // // Install react-devtools via electron-devtools-installer
    // // This is currently broken due to Chrome switching from manifest v2 to v3,
    // // and v2-style extensions won't be supported from January 2023 (time of writing)
    // installExtension(REACT_DEVELOPER_TOOLS, { allowFileAccess: true })
    //   .then((name) => {
    //     console.log(`Added Extension:  ${name}`)
    //   })
    //   .catch((err) => {
    //     console.log('An error occurred: ', err)
    //   })
    // // manually loading react-devtools extension
    // const reactDevToolsPath = path.join(__dirname, 'react-devtools-extension/4.27.1_0')
    // console.log('REACT DEV TOOLS PATH', reactDevToolsPath)
    // const ext = await session.defaultSession.loadExtension(reactDevToolsPath, {
    //   allowFileAccess: true,
    // })
    // console.log('EXT', ext)
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
