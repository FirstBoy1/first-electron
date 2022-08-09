const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const sequelize = require('./database/db.js')
const User = require('./models/user.model')

async function getUsers() {
  return (await User.findAll()).map((user) => user.dataValues)
}

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

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  mainWindow.loadFile(path.join(__dirname, 'index.html'))

  mainWindow.maximize()

  mainWindow.webContents.openDevTools()
  mainWindowState.manage(mainWindow)
}

app.whenReady().then(() => {
  ipcMain.handle('getUsers', getUsers)
  createWindow()
})

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
