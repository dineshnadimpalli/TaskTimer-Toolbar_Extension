const electron = require('electron')
const path = require('path')
const TimerTray = require('./app/timerTray')
const MainWindow = require('./app/mainWindow')

const {
    app,
    BrowserWindow,
    ipcMain
} = electron

let mainWindow, tray

app.on('ready', ()=>{
    app.dock.hide()
    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`)

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
    tray = new TimerTray(iconPath, mainWindow)
})


ipcMain.on('updated-timer', (event, timeLeft)=>{
    tray.setTitle(timeLeft)
})