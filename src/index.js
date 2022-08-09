const { app, BrowserWindow } = require('electron')
const windowStateKeeper = require('electron-window-state')
const path = require('path')

const sequelize = require('./database/db.js')
const User = require('./models/user.model')

sequelize
  .sync()
  .then(async () => {
    console.log('created')
    const newUser = await User.create({
      firstName: 'zeeshan',
      lastName: 'ahmad',
    })
    console.log(newUser)
    const users = await User.findAll()
    users.forEach((user) => console.log(user.dataValues))
    // console.log(users.map(user  => user.))
  })
  .catch((err) => {
    console.log(err)
  })

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800,
  })
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'))
  // mainWindow.maximize()

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  mainWindowState.manage(mainWindow)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

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
