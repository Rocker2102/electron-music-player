import { app, BrowserWindow, ipcMain } from 'electron';
import config from './Config';
import Main from './Main';

Main.main(app, BrowserWindow);

ipcMain.on(config.CHANNELS['MAIN'], (event) => {
    event.sender.send(config.CHANNELS['MAIN'], {
        appName: app.getName(),
        appVersion: app.getVersion(),
    });
});
