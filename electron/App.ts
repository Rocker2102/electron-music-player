import { app, BrowserWindow, ipcMain } from 'electron';
import config from './Config';
import Main from './Main';

import * as mm from 'music-metadata';
import path = require('path');

Main.main(app, BrowserWindow);

ipcMain.on(config.CHANNELS['MAIN'], (event) => {
    event.sender.send(config.CHANNELS['MAIN'], {
        appName: app.getName(),
        appVersion: app.getVersion(),
    });
});

ipcMain.on(config.CHANNELS['PRIMARY_ASYNC'], (event) => {
    mm.parseFile(path.join(__dirname, 'audio.mp3')).then((data) => {
        // console.log(data);
        event.sender.send(config.CHANNELS['PRIMARY_ASYNC'], data);
    }).catch(err => {
        console.log(err);
    });
});
